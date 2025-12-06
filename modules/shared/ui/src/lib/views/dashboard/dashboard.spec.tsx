import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './dashboard';

// Mock the hooks that Dashboard uses if necessary
jest.mock('@karlo/modules-shared-hooks', () => ({
  useAuth: () => ({
    user: { name: 'Test User' },
    isAuthenticated: true,
  }),
  useLogout: () => ({
    mutate: jest.fn(),
  }),
}));

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
