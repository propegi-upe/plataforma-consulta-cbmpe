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

  const handleSearch = () => {
    setDadosMocadosSolicitacoes([
      {
        id: 1,
        protocolo: '321647987/2025',
        dataAbertura: '2022-10-11',
        nome: 'Restaurante Maria Farinha dos Peixes',
        cnpj: '52.050.539/0001 59',
        status: 'Em exigência',
      },
      {
        id: 2,
        protocolo: '321647987/2025',
        dataAbertura: '2022-10-11',
        nome: 'Restaurante Maria Farinha dos Peixes',
        cnpj: '52.050.539/0001 59',
        status: 'Em exigência',
      },
    ]);
    setDadosMocadosAVCB([
      {
        id: 1,
        numeroAvcb: '12/32168123',
        protocolo: '321654987',
        dataEmissao: '2022-10-11',
        nomeFantasia: 'Concha acústica LTDA',
        razaoSocial: 'Antônio Carlos Costa',
        cpfCnpj: '52.050.539/0001-59',
        endereco: 'Rua Tavares Correia, 123, Casa Forte, Recife - PE',
        seguimento: 'Local para shows culturais e intervenções artísticas',
        validade: '2025-10-11',
      },
      {
        id: 2,
        numeroAvcb: '12/32168123',
        protocolo: '321654987',
        dataEmissao: '2022-10-11',
        nomeFantasia: 'Concha acústica LTDA',
        razaoSocial: 'Antônio Carlos Costa',
        cpfCnpj: '52.050.539/0001-59',
        endereco: 'Rua Tavares Correia, 123, Casa Forte, Recife - PE',
        seguimento: 'Local para shows culturais e intervenções artísticas',
        validade: '2024-10-11',
      },
    ]);
    setTextoPesquisa(pesquisa);
  };

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

      {isDataLoaded ? (
        <div className="pt-16 px-6">
          <Tabs activeKey={activeTab} onChange={setActiveTab} justify="justify-start">
            <Tab title="Solicitações">
              {dadosMocadosSolicitacoes.length > 0 ? (
                <div className="display-flex">
                  {dadosMocadosSolicitacoes.map((item) => (
                    <CardSolicitacao key={item.id} item={item} />
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
                  {dadosMocadosAVCB.map((item) => (
                    <CardAvcb key={item.id} item={item} />
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
  );
}
