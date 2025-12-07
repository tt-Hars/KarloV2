import type { Meta, StoryObj } from '@storybook/react';
import { MainHeading } from './main-heading';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { AuthContext } from '@karlo/modules-shared-hooks'; // We import the context directly to provide a mock value

const theme = createTheme();

const mockAuthContext = {
  user: null,
  isAuthenticated: false,
  isSubscribed: false,
  isLoading: false,
  refreshSession: () => { console.log('refreshSession'); },
};

const meta: Meta<typeof MainHeading> = {
  component: MainHeading,
  title: 'Shared/UI/MainHeading',
  decorators: [
    (Story) => (
      <AuthContext.Provider value={mockAuthContext}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </MemoryRouter>
      </AuthContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MainHeading>;

export const Default: Story = {};

export const Authenticated: Story = {
  decorators: [
    (Story) => (
      <AuthContext.Provider value={{ ...mockAuthContext, isAuthenticated: true }}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
};
