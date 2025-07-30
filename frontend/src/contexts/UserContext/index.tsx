'use client';

import { userData } from '@/types/user';
import { localData } from '@/utils/localStorage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type UserContextType = {
  isUserAuthenticated: boolean;
  setIsUserAuthenticated: (value: boolean) => void;
  loadingUser: boolean;
  user?: userData | null;
  setUser?: (value: userData) => void;
  clearUser?: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [user, setUser] = useState<userData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const setUserHandler = (value: userData) => {
    setUser(value);
    localData.user = value;
  };

  const clearUser = () => {
    setUser(null);
    setIsUserAuthenticated(false);
    localData.user = null;
  };

  const initializeUser = async () => {
    if (localData.user !== null) {
      setIsUserAuthenticated(true);
      setUser(localData.user);
    } else {
      setIsUserAuthenticated(false);
      setUser(null);
    }
    setLoadingUser(false);
  };

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (user) {
      setIsUserAuthenticated(true);
    } else {
      setIsUserAuthenticated(false);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      isUserAuthenticated,
      setIsUserAuthenticated,
      loadingUser,
      user,
      setUser: setUserHandler,
      clearUser,
    }),
    [isUserAuthenticated, setIsUserAuthenticated, loadingUser, user, setUser]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
