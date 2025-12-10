import { render } from '@testing-library/react';
import Feed from './feed';
import { AuthProvider } from '@karlo/modules-shared-hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock matchMedia
window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe('Feed', () => {
  const queryClient = new QueryClient({
      defaultOptions: {
          queries: {
              retry: false,
          },
      },
  });

  it('should render successfully', () => {
    const { baseElement } = render(
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Feed />
            </AuthProvider>
        </QueryClientProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
