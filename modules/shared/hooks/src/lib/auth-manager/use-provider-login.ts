import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchClient, queryClient } from '@karlo/modules-shared-utils';
import { AUTH_V1 } from '@karlo/modules-shared-constants';

// AUTH_V1 is /api/v1/users/auth. Provider route is /api/v1/users/auth/provider
const PROVIDER_AUTH_URL = `${AUTH_V1}/provider`;

/**
 * Hook to handle user login via third-party providers (e.g., Google).
 *
 * @returns {UseMutationResult} The mutation result.
 */
export const useProviderLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { email: string; name?: string; provider: string; providerId: string }) =>
      fetchClient(PROVIDER_AUTH_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ['user-session']});
      navigate('/');
    },
    onError: (err: any) => {
      console.error('Provider login failed:', err.message || err);
    },
  });
};
