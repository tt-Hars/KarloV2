import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { BackdropLoader } from './backdrop-loader';

const meta: Meta<typeof BackdropLoader> = {
  component: BackdropLoader,
  title: 'App/BackdropLoader',
};
export default meta;
type Story = StoryObj<typeof BackdropLoader>;

export const Default: Story = {};
