import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloGrid } from './KarloGrid';
import { KarloTypography } from './KarloTypography';
import { Grid } from '@mui/material';

const meta: Meta<typeof KarloGrid> = {
  component: KarloGrid,
  title: 'Karlo UI/KarloGrid',
};
export default meta;
type Story = StoryObj<typeof KarloGrid>;

export const Default: Story = {
  render: (args) => (
    <KarloGrid {...args}>
      <Grid item xs={6}>
        <KarloTypography>Item 1</KarloTypography>
      </Grid>
      <Grid item xs={6}>
        <KarloTypography>Item 2</KarloTypography>
      </Grid>
    </KarloGrid>
  ),
};
