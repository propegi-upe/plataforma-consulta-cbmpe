import { useDataContext, useUserContext } from '@/contexts';
import { mockAVCB, mockSolicitacoes } from '@/utils/searchMocks';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';

interface UseSearch {}

type FormValues = {
  pesquisa: string;
};

export const useSearch = () => {
  const { loadingUser } = useUserContext();
  const {
    dadosMocadosSolicitacoes,
    dadosMocadosAVCB,
    setDadosMocadosSolicitacoes,
    setDadosMocadosAVCB,
    setTextoPesquisa,
    textoPesquisa,
    activeTab,
    setActiveTab,
  } = useDataContext();
  const { register, watch } = useForm<FormValues>({
    defaultValues: { pesquisa: textoPesquisa || '' },
    mode: 'onChange',
  });
  const registerWithMask = useHookFormMask(register);
  const pesquisa = watch('pesquisa');
  const isDataLoaded = dadosMocadosSolicitacoes.length > 0 || dadosMocadosAVCB.length > 0;

  const [solicitacoesVisiveis, setSolicitacoesVisiveis] = useState<any[]>([]);
  const [avcbVisiveis, setAvcbVisiveis] = useState<any[]>([]);
  const [offsetSolicitacoes, setOffsetSolicitacoes] = useState(0);
  const [offsetAvcb, setOffsetAvcb] = useState(0);
  const [loadingScroll, setLoadingScroll] = useState(false);

  const ITEMS_PER_LOAD = 3;

  const carregarMaisSolicitacoes = useCallback(() => {
    const nextItems = dadosMocadosSolicitacoes.slice(
      offsetSolicitacoes,
      offsetSolicitacoes + ITEMS_PER_LOAD
    );
    setSolicitacoesVisiveis((prev) => {
      const ids = new Set(prev.map((item) => item.id));
      return [...prev, ...nextItems.filter((item) => !ids.has(item.id))];
    });
    setOffsetSolicitacoes((prev) => prev + ITEMS_PER_LOAD);
  }, [dadosMocadosSolicitacoes, offsetSolicitacoes]);

  const carregarMaisAvcb = useCallback(() => {
    const nextItems = dadosMocadosAVCB.slice(offsetAvcb, offsetAvcb + ITEMS_PER_LOAD);
    setAvcbVisiveis((prev) => {
      const ids = new Set(prev.map((item) => item.id));
      return [...prev, ...nextItems.filter((item) => !ids.has(item.id))];
    });
    setOffsetAvcb((prev) => prev + ITEMS_PER_LOAD);
  }, [dadosMocadosAVCB, offsetAvcb]);

  const handleSearch = () => {
    setDadosMocadosSolicitacoes(mockSolicitacoes);
    setDadosMocadosAVCB(mockAVCB);
    setTextoPesquisa(pesquisa);
  };

  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop || window.scrollY;
    const scrollBottom = scrollTop + windowHeight;

    if (scrollBottom >= documentHeight - 500 && !loadingScroll) {
      if (
        activeTab === 'Solicitações' &&
        solicitacoesVisiveis.length < dadosMocadosSolicitacoes.length
      ) {
        setLoadingScroll(true);
        setTimeout(() => {
          carregarMaisSolicitacoes();
          setLoadingScroll(false);
        }, 1000);
      } else if (
        activeTab === 'Solicitações' &&
        solicitacoesVisiveis.length >= dadosMocadosSolicitacoes.length
      ) {
        setLoadingScroll(false);
      }

      if (activeTab === 'AVCB' && avcbVisiveis.length < dadosMocadosAVCB.length) {
        setLoadingScroll(true);
        setTimeout(() => {
          carregarMaisAvcb();
          setLoadingScroll(false);
        }, 1000);
      } else if (activeTab === 'AVCB' && avcbVisiveis.length >= dadosMocadosAVCB.length) {
        setLoadingScroll(false);
      }
    }
  }, [
    activeTab,
    solicitacoesVisiveis,
    dadosMocadosSolicitacoes,
    carregarMaisSolicitacoes,
    avcbVisiveis,
    dadosMocadosAVCB,
    carregarMaisAvcb,
    loadingScroll,
  ]);

  useEffect(() => {
    setSolicitacoesVisiveis([]);
    setOffsetSolicitacoes(0);
    if (dadosMocadosSolicitacoes.length > 0) {
      setSolicitacoesVisiveis(dadosMocadosSolicitacoes.slice(0, ITEMS_PER_LOAD));
      setOffsetSolicitacoes(ITEMS_PER_LOAD);
    }
  }, [dadosMocadosSolicitacoes]);

  useEffect(() => {
    setAvcbVisiveis([]);
    setOffsetAvcb(0);
    if (dadosMocadosAVCB.length > 0) {
      setAvcbVisiveis(dadosMocadosAVCB.slice(0, ITEMS_PER_LOAD));
      setOffsetAvcb(ITEMS_PER_LOAD);
    }
  }, [dadosMocadosAVCB]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    loadingUser,
    registerWithMask,
    pesquisa,
    handleSearch,
    isDataLoaded,
    activeTab,
    setActiveTab,
    solicitacoesVisiveis,
    avcbVisiveis,
    loadingScroll,
    dadosMocadosSolicitacoes,
    dadosMocadosAVCB,
  };
};
