'use client';
import arrowUpDown from '@/assets/arrow-down-up.svg';
import Image from 'next/image';

import React, { useState } from 'react';

type item = {
  title: string;
  value: string;
};

type Props = {
  itens: item[];
};

export default function CardHead({ itens }: Props) {
  const [expandido, setExpandido] = useState(false);

  const itensExibidos = expandido ? itens : itens.slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 text-dark transition-all">
      <div className="flex flex-col gap-4">
        {itensExibidos.map((item, index) => (
          <div key={index} className="flex flex-col">
            <strong>{item.title}</strong>
            <span>{item.value}</span>
          </div>
        ))}
      </div>

      {itens.length > 2 && (
        <div
          className="flex flex-col items-center mt-4 cursor-pointer"
          onClick={() => setExpandido(!expandido)}
        >
          <button className="text-dark font-semibold cursor-pointer">
            {expandido ? 'Ver menos' : 'Ver mais'}
          </button>
          <Image
            src={arrowUpDown}
            alt="seta"
            width={20}
            height={20}
            className={`mt-2 transition-transform duration-200 ${expandido ? 'rotate-180' : ''}`}
          />
        </div>
      )}
    </div>
  );
}
