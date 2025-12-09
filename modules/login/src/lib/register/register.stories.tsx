import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Register } from './register';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof Register> = {
  component: Register,
  title: 'Features/Register',
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
type Story = StoryObj<typeof Register>;

export const Default: Story = {};
