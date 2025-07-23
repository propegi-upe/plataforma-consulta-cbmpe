import Image from 'next/image';
import favoriteOutline from '@/assets/favoriteOutline.svg';
import CardHead from './components/CardHead';
import CardCertificate from './components/CardCertificate';
import CardProgressHistory from './components/CardProgressHistory';
import CardRequest from './components/CardRequest';

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    type?: string;
  };
};

export default function Details({ params, searchParams }: Props) {
  const { id } = params;
  const { type } = searchParams;
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
      <div className="text-dark">
        <div className="bg-primary h-32 w-full">
          <div className="px-6 pt-6 flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-start text-white">
              Atestado de Vistoria n°: {id}
            </span>
            <Image
              src={favoriteOutline}
              alt="favoriteOutline"
              width={25}
              height={25}
              className="cursor-pointer hover:opacity-80"
            />
          </div>
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
    );
  }

  if (isSolicitacao) {
    return (
      <div className="text-dark">
        <div className="bg-primary h-32 w-full">
          <div className="px-6 pt-6 flex flex-row items-center justify-between">
            <span className="font-bold text-xl text-start text-white">Projeto n°: {id}</span>
            <Image
              src={favoriteOutline}
              alt="favoriteOutline"
              width={25}
              height={25}
              className="cursor-pointer hover:opacity-80"
            />
          </div>
        </div>
        <div className="px-6">
          <div className="translate-y-[-50px]">
            <CardHead itens={dadosMocados.itens} />
          </div>
          <div className="translate-y-[-35px]">
            <span className="font-bold text-xl text-start text-dark">Atestado de Vistoria</span>
            <CardRequest />
          </div>
          <div>
            <CardProgressHistory />
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}
