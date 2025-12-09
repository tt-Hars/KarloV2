import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Write from './write';

const meta: Meta<typeof Write> = {
  component: Write,
  title: 'Features/Write',
};
export default meta;
type Story = StoryObj<typeof Write>;

export const Default: Story = {};
