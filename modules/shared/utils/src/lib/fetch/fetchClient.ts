// shared/hooks/fetchClient.ts
import { queryClient } from '@karlo/modules/shared/hooks'; // assuming you export it

export const fetchClient = async (
  input: RequestInfo,
  init?: RequestInit & { skipAuth?: boolean }
): Promise<Response> => {
  const options: RequestInit = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    credentials: init?.credentials ?? 'include',
  };

  const response = await fetch(input, options);

  if (response.status === 401 && !init?.skipAuth) {
    // Clear auth-related cache and force logout
    queryClient.setQueryData(['user-session'], null);
  }

  return response;
};
