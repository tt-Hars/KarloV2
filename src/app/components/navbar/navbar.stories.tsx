import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Navbar } from './navbar';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof Navbar> = {
  component: Navbar,
  title: 'App/Navbar',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};
