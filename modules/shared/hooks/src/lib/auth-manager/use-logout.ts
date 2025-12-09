import { useMutation } from '@tanstack/react-query';
import { fetchClient, queryClient } from '@karlo/modules-shared-utils';
import { useNavigate } from 'react-router-dom';

/**
 * Hook to handle user logout.
 *
 * @returns {UseMutationResult} The mutation result.
 */
export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await fetchClient('/api/v1/users/logout', {
        method: 'POST',
      });
      if (!res.ok) throw new Error('Logout failed');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-session'] });
      navigate('/login'); // or any private route like /dashboard
    },
  });
};
