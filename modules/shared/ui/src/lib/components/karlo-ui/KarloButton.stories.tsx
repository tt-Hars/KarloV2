import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloButton } from './KarloButton';

const meta: Meta<typeof KarloButton> = {
  component: KarloButton,
  title: 'Karlo UI/KarloButton',
};
export default meta;
type Story = StoryObj<typeof KarloButton>;

export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'contained',
    color: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'outlined',
    color: 'secondary',
  },
};
