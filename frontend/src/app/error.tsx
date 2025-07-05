// app/error.tsx
'use client'; // necessário para usar useEffect e tratamento de erro no client

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Erro capturado:', error);
  }, [error]);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Algo deu errado</h1>
      <p className="text-gray-700 mb-4">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}
