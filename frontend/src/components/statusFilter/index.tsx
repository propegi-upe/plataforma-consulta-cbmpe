'use client';

import React from 'react';
import { ModalPortal } from '../modalPortal';
import { ModalCustom } from '../modalCustom';
import { Button } from '../button';

interface Props {
  className?: string;
  options: string[];
  optionSelected?: string | null;
  onSelect: (option: string) => void;
}

const StatusFilter: React.FC<Props> = ({ className, optionSelected, options, onSelect }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSelect = () => {
    onSelect(selectedOption || '');
    setOpenModal(false);
  };

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        type="button"
        className={`p-2 rounded h-[42px] px-4 bg-graySecondary font-medium rounded-[20px] text-dark cursor-pointer ${className}`}
      >
        {optionSelected || 'Status'}
      </button>
      <ModalPortal>
        <ModalCustom open={openModal} onClose={() => setOpenModal(false)}>
          <div className="text-center flex flex-col items-center text-dark">
            <div className="bg-gray-200 w-25 h-2 rounded mb-4" />
            <span className="text-md text-dark font-bold">Selecione o status para filtrar</span>
            <div className="flex flex-row flex-wrap justify-center gap-2 mt-4">
              {options.map((option) => (
                <div
                  key={option}
                  className={`p-2 rounded-full cursor-pointer ${selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-300 text-dark'}`}
                  onClick={() => setSelectedOption(option)}
                >
                  {option}
                </div>
              ))}
            </div>
            <Button
              variant="secondary"
              className="border-none w-full text-sm h-[50px] translate-y-[25px] mb-6"
              disabled={false}
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

export { StatusFilter };
