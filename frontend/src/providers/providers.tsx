'use client';

import { UserProvider } from '@/contexts/UserContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserProvider>
      <>{children}</>
    </UserProvider>
  );
};
