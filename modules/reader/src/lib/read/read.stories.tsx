import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Read from './read';

const meta: Meta<typeof Read> = {
  component: Read,
  title: 'Features/Read',
};
export default meta;
type Story = StoryObj<typeof Read>;

export const Default: Story = {};
