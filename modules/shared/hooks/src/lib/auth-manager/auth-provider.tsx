import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@karlo/modules/shared/utils';
import {PROFILE_V1} from '@karlo/modules/shared/constants';

type User = {
  id: string;
  email: string;
  name?: string;
  isSubscribed?: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['user-session'],
    queryFn: async () => {
      const res = await fetchClient(PROFILE_V1);
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    },
    retry: false,
  });

  const value: AuthContextType = {
    user: data ?? null,
    isAuthenticated: !!data,
    isSubscribed: (data?.sub?.level && new Date(data.sub.expiry) > new Date()) ?? false,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

