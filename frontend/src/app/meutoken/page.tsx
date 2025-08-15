'use client';

import { Button, LineInfo } from '@/components';
import Image from 'next/image';
import React, { useRef, useState, ChangeEvent, KeyboardEvent } from 'react';
import logo from '@/assets/logo.png';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts';
import Link from 'next/link';

export default function MyTokenPage() {
  const router = useRouter();
  const { setUser } = useUserContext();

  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (value: string, idx: number) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[idx] = value;
    setDigits(newDigits);

    if (value && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste) {
      const arr = paste.split('');
      const newDigits = [...digits];
      arr.forEach((char, i) => {
        if (i < 6) newDigits[i] = char;
      });
      setDigits(newDigits);
      const lastIdx = arr.length >= 6 ? 5 : arr.length - 1;
      inputsRef.current[lastIdx]?.focus();
    }
    e.preventDefault();
  };

  const handleToken = () => {
    router.push('/entrar');
  };

  const handleAccess = () => {
    const mockUser = {
      name: 'Thiago',
      email: 'thiago@example.com',
    };
    if (setUser) {
      setUser(mockUser);
    }
    router.push('/');
  };

  const isComplete = digits.every((digit) => digit !== '');

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
          title={'Insira o token que você recebeu em seu e-mail no campo abaixo'}
          className="text-justify"
        />
        <div className="px-6 pt-4 flex justify-between space-x-2">
          {digits.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target.value, idx)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, idx)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-2xl border rounded bg-white text-black border-none"
              autoComplete="one-time-code"
            />
          ))}
        </div>
        <LineInfo
          className="pt-[8px] text-justify"
          description={
            '*Dica: Caso não encontre o e-mail em sua caixa de entrada, verifique a pasta de spam do seu e-mail.'
          }
        />
        <div className="px-6">
          <Button
            variant="secondary"
            className="border-none w-full text-sm h-[50px] mb-4"
            disabled={!isComplete}
            onClick={handleAccess}
          >
            Acessar
          </Button>
          <Button
            variant="secondaryOutline"
            className="w-full text-sm h-[50px]"
            disabled={false}
            onClick={handleToken}
          >
            Não recebi o token
          </Button>
          <Link href="/" className="text-sm text-white underline text-center block mt-4">
            Voltar ao início
          </Link>
        </div>
      </div>
    </>
  );
}
