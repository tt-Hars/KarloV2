// hooks/useLogin.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '@karlo/modules/shared/utils';
import { AUTH_V1 } from '@karlo/modules/shared/constants';
import {queryClient} from '../react-query/queryClient';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      fetchClient(AUTH_V1, {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    onSuccess: async () => {
      // Refetch user data from /auth/refresh and cache it
      await queryClient.invalidateQueries({queryKey: ['user-session']});
      navigate('/'); // or any private route like /dashboard
    },
    onError: (err: any) => {
      console.error('Login failed:', err.message || err);
    },
  });
};
