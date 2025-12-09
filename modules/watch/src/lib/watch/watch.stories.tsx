import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Watch from './watch';

const meta: Meta<typeof Watch> = {
  component: Watch,
  title: 'Features/Watch',
};
export default meta;
type Story = StoryObj<typeof Watch>;

export const Default: Story = {};
