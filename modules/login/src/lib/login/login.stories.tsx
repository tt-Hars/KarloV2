import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Login } from './login';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof Login> = {
  component: Login,
  title: 'Features/Login',
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Login>;

export const Default: Story = {};
