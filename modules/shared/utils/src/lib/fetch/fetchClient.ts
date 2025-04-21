export const fetchClient = (
  input: RequestInfo,
  init?: RequestInit & { skipAuth?: boolean }
): Promise<Response> => {
  const options: RequestInit = {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    credentials: init?.credentials ?? 'include', // important
  };

  return fetch(input, options);
};
