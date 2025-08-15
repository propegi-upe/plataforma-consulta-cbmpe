'use client';

import { Button, LineInfo } from '@/components';
import Image from 'next/image';
import React from 'react';
import logo from '@/assets/logo.png';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const handleLogin = () => {
    // Logic for handling login can be added here
    router.push('/meutoken');
  };
  const [email, setEmail] = React.useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isEmailValid = () => {
    // Basic email validation logic
    return email.includes('@') && email.includes('.');
  };

  return (
    <>
      <div className="bg-primary h-screen ">
        <LineInfo
          title={'Sistema Integrado de Acompanhamento de Processos do CBMPE'}
          className="text-center"
        />
        <div className="flex justify-center items-center ">
          <Image src={logo} alt="Descrição da imagem" width={236} />
        </div>
        <LineInfo
          title={'Insira seu e-mail no campo abaixo para receber um token e acessar sua conta'}
          className="text-justify"
        />
        <div className="px-6 pt-4">
          <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="CPF, CNPJ, processo ou nome da empresa"
            className="w-full h-[50px] border-none bg-white text-dark px-4 rounded-lg font-medium shadow-md"
          />
        </div>
        <LineInfo
          className="pt-[8px]"
          description={
            'Você irá receber um token em seu e-mail e deverá inseri-lo no próximo passo.'
          }
        />
        <div className="px-6">
          <Button
            variant="secondary"
            className="border-none w-full text-sm h-[50px]"
            disabled={!isEmailValid()}
            onClick={handleLogin}
          >
            Receber token
          </Button>

          <Link href="/" className="text-sm text-white underline text-center block mt-4">
            Voltar ao início
          </Link>
        </div>
      </div>
    </>
  );
}
