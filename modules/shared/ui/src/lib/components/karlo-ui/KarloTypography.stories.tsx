import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloTypography } from './KarloTypography';

const meta: Meta<typeof KarloTypography> = {
  component: KarloTypography,
  title: 'Karlo UI/KarloTypography',
};
export default meta;
type Story = StoryObj<typeof KarloTypography>;

export const Default: Story = {
  args: {
    children: 'This is a typography component',
    variant: 'h1',
  },
};
