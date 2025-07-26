'use client';

import Image from 'next/image';
import logo from '@/assets/logo.png';
import ButtonGov from '@/components/buttonGov';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import LineInfo from '@/components/lineInfo';
import { useUserContext } from '@/contexts/UserContext';
import Loading from '@/components/loading';

export default function Home() {
  const router = useRouter();
  const { isUserAuthenticated, user, loadingUser } = useUserContext();

  if (loadingUser) {
    return <Loading />;
  }

  return (
    <>
      <div className="bg-primary">
        {/* BOAS VINDAS DESLOGADO */}
        <LineInfo
          title={`Seja bem vindo ${user?.name || ''} ao Sistema Integrado de Acompanhamento de Processos do CBMPE`}
          description="Acompanhe solicitações e processos de aprovação de projetos contra incêndio e pânico, e AVCB. Também tenha acesso aos AVCBs dos estabelecimentos do estado de Pernambuco."
        />

        <div className="flex items-center justify-center px-6 pb-6">
          <Button
            variant="white"
            className="border-none w-full text-sm h-[50px]"
            onClick={() => router.push('/buscar')}
          >
            <strong>Encontre </strong>
            solicitações e AVCB junto ao CBMPE
          </Button>
        </div>
      </div>

      {/* GRIDS CARROUSEIS */}
      {isUserAuthenticated ? (
        <></>
      ) : (
        <div className="flex flex-col items-center justify-center p-6">
          <div className="mb-8">
            <Image src={logo} alt="Descrição da imagem" width={236} />
          </div>
          <p className="text-dark font-semibold text-center mb-4">
            Entre com o gov.br e tenha acesso a solicitações e alvarás favoritados por você
          </p>
          <ButtonGov className="border-none w-full" />
        </div>
      )}
    </>
  );
}
