import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloTextField } from './KarloTextField';

const meta: Meta<typeof KarloTextField> = {
  component: KarloTextField,
  title: 'Karlo UI/KarloTextField',
};
export default meta;
type Story = StoryObj<typeof KarloTextField>;

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
  },
};
