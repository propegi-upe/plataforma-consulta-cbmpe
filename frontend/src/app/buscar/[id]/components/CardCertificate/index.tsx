'use client';

import Button from '@/components/button';
import StatusChip from '@/components/statusChip';
import React, { useState } from 'react';

type Props = {};

export default function CardCertificate({}: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm px-4 mb-4 text-dark transition-all mt-8">
      <div className="flex justify-center translate-y-[-25px]">
        <StatusChip
          status="Válido até 10/10/2025"
          circleColor="bg-green-500"
          bgColor="bg-green-100"
        />
      </div>
      <div className="translate-y-[-20px]">
        <div className="flex flex-col justify-center items-center mb-6 text-sm font-semibold">
          <span>AVCB emitido em 11/10/2024</span>
          <span>Protocolo: 321654987</span>
        </div>
        <Button variant="filledAzul" className="text-sm h-[40px] w-full" onClick={() => {}}>
          Baixar AVCB
        </Button>
      </div>
    </div>
  );
}
