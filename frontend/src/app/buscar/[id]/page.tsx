'use client';

import CardHead from './components/CardHead';
import CardCertificate from './components/CardCertificate';
import CardProgressHistory from './components/CardProgressHistory';
import CardRequest from './components/CardRequest';
import HeadDetails from './components/HeadDetails';
import { useParams, useSearchParams } from 'next/navigation';

export default function Details() {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const type = searchParams.get('type');
  const isAvcb = type === 'avcb';
  const isSolicitacao = type === 'solicitacao';
  const dadosMocados = {
    itens: [
      {
        title: 'Razão Social',
        value: 'Bar Havanna Club LTDA',
      },
      {
        title: 'Nome Fantasia',
        value: 'Havanna',
      },
      {
        title: 'CPF/CNPJ',
        value: '12.345.678/0001-90',
      },
      {
        title: 'Endereço',
        value: 'Rua Exemplo, 123, Bairro, Cidade - UF',
      },
      {
        title: 'Seguimento',
        value: 'Local para shows culturais e intervenções artísticas',
      },
    ],
  };

  if (isAvcb) {
    return (
      <>
        <div className="text-dark">
          <div className="bg-primary h-32 w-full">
            <HeadDetails title={`Atestado de Vistoria n°: ${id}`} />
          </div>
          <div className="px-6">
            <div className="translate-y-[-50px]">
              <CardHead itens={dadosMocados.itens} />
            </div>
            <div className="translate-y-[-35px]">
              <span className="font-bold text-xl text-start text-dark">Atestado de Vistoria</span>
              <CardCertificate />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isSolicitacao) {
    return (
      <>
        <div className="text-dark">
          <div className="bg-primary h-32 w-full">
            <HeadDetails title={`Projeto n°: ${id}`} />
          </div>
          <div className="px-6">
            <div className="translate-y-[-50px]">
              <CardHead itens={dadosMocados.itens} />
            </div>
            <div className="translate-y-[-35px]">
              <span className="font-bold text-xl text-start text-dark">
                Andamento da solicitação
              </span>
              <CardRequest />
            </div>
            <div>
              <CardProgressHistory />
            </div>
          </div>
        </div>
      </>
    );
  }

  return <></>;
}
