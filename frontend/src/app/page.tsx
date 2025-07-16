import Image from 'next/image';
import logo from '@/assets/logo.png';
import ButtonGov from '@/components/buttonGov';

export default function Home() {
  return (
    <div>
      <div className="bg-primary">
        {/* BOAS VINDAS DESLOGADO */}
        <div className="px-6 pt-6">
          <h1 className="mb-5 font-bold text-xl text-start text-white">
            Seja bem vindo ao Sistema Integrado de Acompanhamento de Processos do CBMPE
          </h1>
          <p className="text-white text-sm mb-5">
            Acompanhe solicitações e tenha acesso a alvarás de funcionamento dos estabelecimentos do
            estado de Pernambuco.{' '}
          </p>
        </div>

        {/* GRID CAROUSEL */}
        <div className="grid grid-cols-2 gap-4 pb-4 px-6 text-dark">
          <div className="bg-white p-4 border-radius-8">
            <p>Encontre solicitações e alvarás junto ao CBMPE</p>
          </div>
          <div className="bg-white p-4">
            <p>Documentos para iniciar sua solicitação junto ao CBMPE</p>
          </div>
        </div>
      </div>

      {/* GRIDS CARROUSEIS */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="mb-8">
          <Image src={logo} alt="Descrição da imagem" width={236} />
        </div>
        <p className="text-dark font-semibold text-center mb-4">
          Entre com o gov.br e tenha acesso a solicitações e alvarás favoritados por você
        </p>
        <ButtonGov />
      </div>
    </div>
  );
}
