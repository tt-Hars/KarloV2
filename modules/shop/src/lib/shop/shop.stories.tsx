import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Shop from './shop';

const meta: Meta<typeof Shop> = {
  component: Shop,
  title: 'Features/Shop',
};
export default meta;
type Story = StoryObj<typeof Shop>;

export const Default: Story = {};
