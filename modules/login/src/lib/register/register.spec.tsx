import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Register } from './register';

const queryClient = new QueryClient();

describe('Register', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Register />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
