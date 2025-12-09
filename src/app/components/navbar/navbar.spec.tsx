import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from './navbar';

jest.mock('@karlo/modules-shared-hooks', () => ({
  useAuthContext: jest.fn().mockReturnValue({ isAuthenticated: true }),
  useLocalStorageManager: jest.fn().mockReturnValue({ value: false }),
  useLogout: jest.fn().mockReturnValue({ mutate: jest.fn() }),
}));

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
