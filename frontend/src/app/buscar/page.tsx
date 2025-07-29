'use client';

import Button from '@/components/button';
import Image from 'next/image';
import buscar from '@/assets/buscar.png';
import LineInfo from '@/components/lineInfo';
import CardSolicitacao from './components/CardSolicitacao';
import { Tab, Tabs } from '@/components';
import CardAvcb from './components/CardAvcb';
import { useForm } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
import Loading from '@/components/loading';
import { useUserContext, useDataContext } from '@/contexts';
import { useCallback, useEffect, useState } from 'react';
import { mockAVCB, mockSolicitacoes } from '@/utils/searchMocks';

type FormValues = {
  pesquisa: string;
};

export default function Search() {
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
        setLoadingScroll(false); // força o fim
      }

      if (activeTab === 'AVCB' && avcbVisiveis.length < dadosMocadosAVCB.length) {
        setLoadingScroll(true);
        setTimeout(() => {
          carregarMaisAvcb();
          setLoadingScroll(false);
        }, 1000);
      } else if (activeTab === 'AVCB' && avcbVisiveis.length >= dadosMocadosAVCB.length) {
        setLoadingScroll(false); // força o fim
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

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-primary">
        <LineInfo
          title="Busque solicitações de projeto e AVCB junto ao CBMPE"
          description="Acompanhe solicitações e processos de aprovação de projetos contra incêndio e pânico, e AVCB. Também tenha acesso aos AVCBs dos estabelecimentos do estado de Pernambuco."
        />

        <div className="px-6">
          <input
            {...registerWithMask('pesquisa', ['999.999.999-99', '99.999.999/9999-99'])}
            type="text"
            placeholder="CPF, CNPJ, processo ou nome da empresa"
            className="w-full h-[50px] border-none bg-white text-dark px-4 py-2 rounded-lg font-medium shadow-md"
          />
        </div>
        <div className="px-6">
          <Button
            variant="secondary"
            className="border-none w-full text-sm h-[50px] translate-y-[25px]"
            disabled={pesquisa === ''}
            onClick={() => {
              handleSearch();
            }}
          >
            Buscar
          </Button>
        </div>
      </div>

      <>
        {isDataLoaded ? (
          <div className="pt-16 px-6">
            <Tabs activeKey={activeTab} onChange={setActiveTab} justify="justify-start">
              <Tab title="Solicitações">
                {dadosMocadosSolicitacoes.length > 0 ? (
                  <div className="display-flex">
                    {solicitacoesVisiveis.map((item) => (
                      <CardSolicitacao key={`solicitacao-${item.id}`} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center  pt-24">
                    <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                      Acesse informações sobre solicitações e AVCB de funcionamento dos locais que
                      você visita.
                    </p>
                  </div>
                )}
              </Tab>
              <Tab title="AVCB">
                {dadosMocadosAVCB.length > 0 ? (
                  <div className="display-flex">
                    {avcbVisiveis.map((item) => (
                      <CardAvcb key={`avcb-${item.id}`} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-24">
                    <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                      Acesse informações sobre solicitações e AVCB de funcionamento dos locais que
                      você visita.
                    </p>
                  </div>
                )}
              </Tab>
            </Tabs>
            {loadingScroll &&
              ((activeTab === 'Solicitações' &&
                solicitacoesVisiveis.length < dadosMocadosSolicitacoes.length) ||
                (activeTab === 'AVCB' && avcbVisiveis.length < dadosMocadosAVCB.length)) && (
                <div className="flex items-center justify-center flex-col ">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                </div>
              )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center  pt-24">
            <div className="mb-8">
              <Image src={buscar} alt="buscar" width={168} />
            </div>
            <p className="text-[#d6d6d6] font-semibold text-center mb-4">
              Acesse informações sobre solicitações e AVCB de funcionamento dos locais que você
              visita.
            </p>
          </div>
        )}
      </>
    </>
  );
}
