// shared/hooks/fetchClient.ts
// shared/react-query/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient instance for React Query.
 */
export const queryClient = new QueryClient();

/**
 * A wrapper around the native fetch API that handles common logic like headers and auth errors.
 *
 * @param {RequestInfo} input - The resource to fetch.
 * @param {RequestInit & { skipAuth?: boolean }} [init] - Optional settings.
 * @returns {Promise<Response>} The response.
 */
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
