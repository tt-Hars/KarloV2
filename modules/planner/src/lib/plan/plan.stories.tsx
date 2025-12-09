import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Plan from './plan';

const meta: Meta<typeof Plan> = {
  component: Plan,
  title: 'Features/Plan',
};
export default meta;
type Story = StoryObj<typeof Plan>;

export const Default: Story = {};
