import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Payment from './payment';

const queryClient = new QueryClient();

describe('Payment', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Payment />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
