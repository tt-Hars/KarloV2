import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Listen from './listen';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Listen> = {
  component: Listen,
  title: 'Features/Listen',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Listen>;

export const Default: Story = {};
