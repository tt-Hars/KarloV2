import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './profile';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { AuthContext } from '@karlo/modules-shared-hooks';

const theme = createTheme();

const mockAuthContext = {
  user: {
    id: '1',
    email: 'test@example.com',
    name: 'TestUser',
  },
  isAuthenticated: true,
  isSubscribed: false,
  isLoading: false,
  refreshSession: () => { console.log('refreshSession'); },
};

const meta: Meta<typeof Profile> = {
  component: Profile,
  title: 'Shared/UI/Profile',
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
type Story = StoryObj<typeof Profile>;

export const Default: Story = {};

export const Subscribed: Story = {
  decorators: [
      (Story) => {
        // Mocking useLocalStorageManager is harder because it is a hook, not a context.
        // But Profile view uses `useLocalStorageManager` which returns an object with `value`.
        // We might need to mock the module or create a wrapper if we want to change it.
        // For now, let's assume default behavior (false).
        // If we really need to mock it, we should probably refactor Profile to take subscription status as prop or from context.
        return <Story />;
      }
  ]
};
