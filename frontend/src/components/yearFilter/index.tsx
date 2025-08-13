'use client';

import React from 'react';
import { ModalPortal } from '../modalPortal';
import { ModalCustom } from '../modalCustom';
import { Button } from '../button';

interface Props {
  className?: string;
  yearSelected?: number | null;
  onSelect?: (year: number) => void;
}

const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let y = 2000; y <= currentYear; y++) {
    years.push(y);
  }
  return years.reverse(); // Anos mais recentes no topo
};

const YearFilter: React.FC<Props> = ({ className, yearSelected, onSelect }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedYear, setSelectedYear] = React.useState<number | null>(yearSelected || null);

  const years = React.useMemo(getYears, []);

  const handleSelect = () => {
    if (onSelect && selectedYear) {
      onSelect(selectedYear);
    }
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className={`p-2 rounded px-4 h-[42px] bg-graySecondary font-medium rounded-[20px] text-dark cursor-pointer ${className}`}
      >
        {yearSelected || 'Ano'}
      </button>
      <ModalPortal>
        <ModalCustom open={openModal} onClose={() => setOpenModal(false)}>
          <div className="text-center flex flex-col items-center text-dark">
            <div className="bg-gray-200 w-25 h-2 rounded mb-4" />
            <span className="text-md text-dark font-bold">Selecione o ano para filtrar</span>
            <div
              className="flex flex-col gap-2 mt-4 mb-4 overflow-y-auto"
              style={{
                maxHeight: 100,
                width: '100%',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {years.map((year) => (
                <div
                  key={year}
                  className={`p-2 rounded-full cursor-pointer transition-all ${
                    selectedYear === year
                      ? 'bg-blue-500 text-white font-semibold'
                      : 'bg-gray-300 text-dark'
                  }`}
                  onClick={() => setSelectedYear(year)}
                >
                  {year}
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              className="border-none w-full text-sm h-[50px] translate-y-[25px] mb-6"
              disabled={!selectedYear}
              onClick={handleSelect}
            >
              Filtrar
            </Button>
          </div>
        </ModalCustom>
      </ModalPortal>
    </>
  );
};

export { YearFilter };
