'use client';

import { StatusFilter, YearFilter } from '@/components';
import { optionsStatus } from '@/utils/optionsStatus';
import React, { useState } from 'react';

type Props = {};

export default function Filtros({}: Props) {
  const [statusSelected, setStatusSelected] = useState<string | null>(null);
  const [yearSelected, setYearSelected] = useState<number | null>(null);
  return (
    <>
      <YearFilter yearSelected={yearSelected} onSelect={setYearSelected} />
      <StatusFilter
        options={optionsStatus}
        optionSelected={statusSelected}
        onSelect={setStatusSelected}
      />
    </>
  );
}
