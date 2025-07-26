'use client';

import { UserProvider, DataProvider } from '@/contexts';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <DataProvider>
        <>{children}</>
      </DataProvider>
    </UserProvider>
  );
};
