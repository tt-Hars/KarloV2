import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloContainer } from './KarloContainer';
import { KarloTypography } from './KarloTypography';

const meta: Meta<typeof KarloContainer> = {
  component: KarloContainer,
  title: 'Karlo UI/KarloContainer',
};
export default meta;
type Story = StoryObj<typeof KarloContainer>;

export const Default: Story = {
  args: {
    children: <KarloTypography>Content inside container</KarloTypography>,
  },
};
