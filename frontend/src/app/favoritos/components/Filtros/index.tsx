'use client';

import { CustomSelect } from '@/components';
import React from 'react';

type Props = {};

export default function Filtros({}: Props) {
  return (
    <>
      <CustomSelect
        value={''}
        onChange={() => {}}
        options={[
          { value: '', label: 'Ano' },
          { value: '2024', label: '2024' },
          { value: '2025', label: '2025' },
        ]}
      />
      <CustomSelect
        value={''}
        onChange={() => {}}
        options={[
          { value: '', label: 'Status' },
          { value: 'Em andamento', label: 'Em andamento' },
          { value: 'Em exigência', label: 'Em exigência' },
        ]}
      />
    </>
  );
}
