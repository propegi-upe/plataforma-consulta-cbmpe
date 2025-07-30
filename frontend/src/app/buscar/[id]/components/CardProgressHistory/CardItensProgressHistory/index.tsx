'use client';

import { Button, ModalCustom, ModalPortal, StatusChip } from '@/components';
import React, { useState } from 'react';

type item = {
  title: string;
  date: string;
};

type Props = {
  item: item;
};

export default function CardItensProgressHistory({ item }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div>
        <div
          className="flex flex-row justify-between items-center mt-2 text-sm bg-gray p-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <strong>{item.title}</strong>
          <span>Em {item.date}</span>
        </div>
      </div>
      <ModalPortal>
        <ModalCustom open={openModal} onClose={() => setOpenModal(false)}>
          <div className="text-center flex flex-col items-center text-dark">
            <div className="bg-gray-200 w-25 h-2 rounded mb-8" />

            <div className="flex flex-col gap-4 justify-center items-center">
              <div className="flex flex-col gap-2 items-center">
                <StatusChip
                  status={item.title}
                  className="py-2"
                  bgColor="bg-gray-200"
                  circleColor="bg-gray-300"
                />
                <span className="font-semibold">Em 10/02/2025 - 10:53 h</span>
              </div>
              <span>
                É necessário que o <strong>responsável pela solicitação</strong> <br />
                cumpra as exigências descrita do arquivo. Clique no botão abaixo para baixar o
                documento.
              </span>
              <Button
                variant="filledAzul"
                className="text-sm h-[40px] w-[200px]"
                onClick={() => {}}
              >
                Baixar exigências
              </Button>
              <span className="text-sm font-semibold">
                Status finalizado em 23/02/2025 - 10:53 h
              </span>
            </div>
          </div>
        </ModalCustom>
      </ModalPortal>
    </>
  );
}
