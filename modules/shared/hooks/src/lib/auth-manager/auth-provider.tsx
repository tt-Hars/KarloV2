import { createContext, useContext, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@karlo/modules/shared/utils';
import { PROFILE_V1, REFRESH_V1 } from '@karlo/modules/shared/constants';
import { queryClient } from '../react-query/queryClient';

type User = {
  id: string;
  email: string;
  name?: string;
  sub?: {
    level: string;
    expiry: string;
  };
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isSubscribed: boolean;
  isLoading: boolean;
  refreshSession: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  useQuery({
    queryKey: ['refresh-access-token'],
    queryFn: async () => {
      const res = await fetchClient(REFRESH_V1, { method: 'POST' });
      if (!res.ok) {
        if (res.status === 401) return null;
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to fetch user profile');
      }
      return res.json();
    },
    refetchInterval: 15 * 60 * 1000, // 15 minutes
    refetchIntervalInBackground: true,
    retry: false,
    enabled: true,
  });

  const { data, isLoading } = useQuery<User | null>({
    queryKey: ['user-session'],
    queryFn: async () => {
      const res = await fetchClient(PROFILE_V1);
      if (!res.ok) {
        if (res.status === 401) return null;
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.message || 'Failed to fetch user profile');
      }
      return res.json();
    },
    retry: false,
    staleTime: 0,
  });

  const refreshSession = () => {
    queryClient.invalidateQueries({ queryKey: ['refresh-token'] });
    queryClient.invalidateQueries({ queryKey: ['user-session'] });
  };

  const isSubscribed =
    !!((data as any)?.data?.sub?.level && new Date((data as any)?.data.sub.expiry) > new Date());

  const value: AuthContextType = {
    user: data ?? null,
    isAuthenticated: !!data,
    isSubscribed,
    isLoading,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};
