'use client';

import Image from 'next/image';
import buscar from '@/assets/buscar.png';
import {
  Button,
  CardAvcb,
  CardSolicitacao,
  CustomSelect,
  LineInfo,
  Loading,
  Tab,
  Tabs,
} from '@/components';
import { useSearch } from './hooks/useSearch';

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
  } = useSearch();

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
          <div className="pt-12 px-6">
            <Tabs activeKey={activeTab} onChange={setActiveTab} justify="justify-start">
              <Tab title="Solicitações">
                {dadosMocadosSolicitacoes.length > 0 ? (
                  <>
                    <div className="pb-4 flex gap-2">
                      <CustomSelect
                        value={''}
                        onChange={() => {}}
                        options={[
                          { value: '', label: 'Ano' },
                          { value: '2024', label: '2024' },
                          { value: '2025', label: '2025' },
                        ]}
                      />
                      <CustomSelect
                        value={''}
                        onChange={() => {}}
                        options={[
                          { value: '', label: 'Status' },
                          { value: 'Em andamento', label: 'Em andamento' },
                          { value: 'Em exigência', label: 'Em exigência' },
                        ]}
                      />
                    </div>
                    <div className="display-flex">
                      {solicitacoesVisiveis.map((item) => (
                        <CardSolicitacao key={`solicitacao-${item.id}`} item={item} />
                      ))}
                    </div>
                  </>
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
                  <>
                    <div className="pb-4 flex gap-2 text-dark">
                      <select
                        value={''}
                        onChange={() => {}}
                        className="p-2 rounded w-[70px] h-[42px] bg-graySecondary  font-medium rounded-[20px] focus:outline-none focus:ring-0"
                      >
                        <option value="" disabled>
                          Ano
                        </option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                      </select>
                      <select
                        value={''}
                        onChange={() => {}}
                        className="p-2 rounded w-[85px] h-[42px] bg-graySecondary font-medium rounded-[20px] focus:outline-none focus:ring-0"
                      >
                        <option value="" disabled>
                          Status
                        </option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Em exigência">Em exigência</option>
                      </select>
                    </div>
                    <div className="display-flex">
                      {avcbVisiveis.map((item) => (
                        <CardAvcb key={`avcb-${item.id}`} item={item} />
                      ))}
                    </div>
                  </>
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
