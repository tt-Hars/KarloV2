import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Feed from './feed';

const meta: Meta<typeof Feed> = {
  component: Feed,
  title: 'Features/Feed',
};
export default meta;
type Story = StoryObj<typeof Feed>;

export const Default: Story = {};
