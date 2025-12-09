import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Payment from './payment';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const meta: Meta<typeof Payment> = {
  component: Payment,
  title: 'Features/Payment',
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
type Story = StoryObj<typeof Payment>;

export const Default: Story = {};
