// hooks/useRegister.ts
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchClient, queryClient } from '@karlo/modules-shared-utils';
import { REGISTER_V1 } from '@karlo/modules-shared-constants';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string, name?: string }) =>
      fetchClient(REGISTER_V1, {
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
    onSuccess: async () => {
      // Refetch user data or just navigate
       await queryClient.invalidateQueries({queryKey: ['user-session']});
      navigate('/'); // Redirect to dashboard or login
    },
    onError: (err: any) => {
      console.error('Registration failed:', err.message || err);
    },
  });
};
