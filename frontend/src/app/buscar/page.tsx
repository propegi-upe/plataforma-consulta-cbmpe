'use client';

import Image from 'next/image';
import buscar from '@/assets/buscar.png';
import {
  Button,
  CardAvcb,
  CardSolicitacao,
  LineInfo,
  Loading,
  StatusFilter,
  Tab,
  Tabs,
  YearFilter,
} from '@/components';
import { useSearch } from './hooks/useSearch';
import { optionsStatus } from '@/utils/optionsStatus';
import { useState } from 'react';
import notSearch from '@/assets/not-search.svg';

export default function Search() {
  const {
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
    yearSelected,
    setYearSelected,
    statusSelected,
    setStatusSelected,
  } = useSearch();

  const [searchLoading, setSearchLoading] = useState(false);

  if (loadingUser) {
    return <Loading />;
  }

  const handleFakeLoading = () => {
    setSearchLoading(true);
    setTimeout(() => {
      handleSearch();
      setSearchLoading(false);
    }, 1400);
  };

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
            onClick={handleFakeLoading}
          >
            Buscar
          </Button>
        </div>
      </div>

      <>
        {isDataLoaded ? (
          <div className="pt-12 px-6">
            <Tabs activeKey={activeTab} onChange={setActiveTab} justify="justify-start">
              <Tab title="Solicitações">
                {dadosMocadosSolicitacoes.length > 0 && !searchLoading && (
                  <>
                    <div className="pb-4 flex gap-2">
                      <YearFilter yearSelected={yearSelected} onSelect={setYearSelected} />
                      <StatusFilter
                        options={optionsStatus}
                        optionSelected={statusSelected}
                        onSelect={setStatusSelected}
                      />
                    </div>
                    <div className="display-flex">
                      {solicitacoesVisiveis.map((item) => (
                        <CardSolicitacao key={`solicitacao-${item.id}`} item={item} />
                      ))}
                    </div>
                  </>
                )}
                {dadosMocadosSolicitacoes.length === 0 && !searchLoading && (
                  <div className="flex flex-col items-center justify-center  pt-6">
                    <div className="mb-8">
                      <Image src={notSearch} alt="buscar" width={168} />
                    </div>
                    <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                      Não foi encontrado registros de solicitações para este estabelecimento.
                    </p>
                  </div>
                )}
                {searchLoading && (
                  <div className="flex items-center justify-center flex-col mt-16 ">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
                  </div>
                )}
              </Tab>
              <Tab title="AVCB">
                {dadosMocadosAVCB.length > 0 && !searchLoading && (
                  <>
                    <div className="pb-4 flex gap-2">
                      <YearFilter yearSelected={yearSelected} onSelect={setYearSelected} />
                      <StatusFilter
                        options={optionsStatus}
                        optionSelected={statusSelected}
                        onSelect={setStatusSelected}
                      />
                    </div>
                    <div className="display-flex">
                      {avcbVisiveis.map((item) => (
                        <CardAvcb key={`avcb-${item.id}`} item={item} />
                      ))}
                    </div>
                  </>
                )}

                {dadosMocadosAVCB.length === 0 && !searchLoading && (
                  <div className="flex flex-col items-center justify-center  pt-6">
                    <div className="mb-8">
                      <Image src={notSearch} alt="buscar" width={168} />
                    </div>
                    <p className="text-[#d6d6d6] font-semibold text-center mb-4">
                      Não foi encontrado registros de AVCB para este estabelecimento.
                    </p>
                  </div>
                )}
                {searchLoading && (
                  <div className="flex items-center justify-center flex-col mt-16 ">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
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
