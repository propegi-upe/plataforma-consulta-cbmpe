'use client';

import React, { useState } from 'react';
import arrowUpDown from '@/assets/arrow-down-up.svg';
import Image from 'next/image';
import CardItensProgressHistory from './CardItensProgressHistory';

type Props = {};

export default function CardProgressHistory({}: Props) {
  const [expandido, setExpandido] = useState(false);
  const itensProgressHistory = [
    {
      title: 'Em exigência',
      date: '10/02/2025',
    },
    {
      title: 'Triagem de documentos',
      date: '09/02/2025',
    },
    {
      title: 'Em exigência',
      date: '08/02/2025',
    },
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4 text-dark transition-all translate-y-[-20px]">
        <button
          className="w-full flex flex-row justify-between items-center bg-transparent border-0 p-0 m-0 outline-none"
          onClick={() => setExpandido(!expandido)}
        >
          <span className="font-bold text-xl text-start text-dark">Histórico de andamento</span>
          <Image
            src={arrowUpDown}
            alt="arrowUpDown"
            width={20}
            height={20}
            className={`transition-transform duration-200 ${expandido ? 'rotate-180' : ''} cursor-pointer`}
          />
        </button>

        {expandido && (
          <div>
            <span className="text-sm">Clique nos status para ver informação</span>
            {itensProgressHistory.map((item, index) => (
              <CardItensProgressHistory key={index} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
