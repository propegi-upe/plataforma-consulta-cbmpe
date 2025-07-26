import { Avcb, Solicitacao } from '@/types/cardsolicitacao';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useUserContext } from '../UserContext';

type DataContextType = {
  dadosMocadosSolicitacoes: Solicitacao[];
  setDadosMocadosSolicitacoes: React.Dispatch<React.SetStateAction<Solicitacao[]>>;
  dadosMocadosAVCB: Avcb[];
  setDadosMocadosAVCB: React.Dispatch<React.SetStateAction<Avcb[]>>;
  textoPesquisa: string;
  setTextoPesquisa: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isUserAuthenticated } = useUserContext();
  const pathname = usePathname();
  const [textoPesquisa, setTextoPesquisa] = useState('');
  const [dadosMocadosSolicitacoes, setDadosMocadosSolicitacoes] = useState<Solicitacao[]>([]);
  const [dadosMocadosAVCB, setDadosMocadosAVCB] = useState<Avcb[]>([]);
  const [activeTab, setActiveTab] = useState('Solicitações');

  useEffect(() => {
    if (pathname === '/') {
      setDadosMocadosSolicitacoes([]);
      setDadosMocadosAVCB([]);
      setTextoPesquisa('');
    }
  }, [pathname]);

  useEffect(() => {
    if (!isUserAuthenticated) {
      setDadosMocadosSolicitacoes([]);
      setDadosMocadosAVCB([]);
      setTextoPesquisa('');
      setActiveTab('Solicitações');
    }
  }, [isUserAuthenticated]);

  const value = useMemo(
    () => ({
      dadosMocadosSolicitacoes,
      setDadosMocadosSolicitacoes,
      dadosMocadosAVCB,
      setDadosMocadosAVCB,
      textoPesquisa,
      setTextoPesquisa,
      activeTab,
      setActiveTab,
    }),
    [
      dadosMocadosSolicitacoes,
      setDadosMocadosSolicitacoes,
      dadosMocadosAVCB,
      setDadosMocadosAVCB,
      textoPesquisa,
      setTextoPesquisa,
      activeTab,
      setActiveTab,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};
