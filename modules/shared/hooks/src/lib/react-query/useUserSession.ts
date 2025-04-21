import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@karlo/modules/shared/utils';

type UserSession = {
  isAuthenticated: boolean;
  isSubscribed: boolean;
  name: string;
  email: string;
};

export const useUserSession = () => {
  return useQuery<UserSession>({
    queryKey: ['user-session'],
    queryFn: async () => {
      const res = await fetchClient('/api/users/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Unauthorized');
      return res.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
};
