import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { KarloMasonry } from './KarloMasonry';
import { KarloBox } from './KarloBox';
import { KarloTypography } from './KarloTypography';

const meta: Meta<typeof KarloMasonry> = {
  component: KarloMasonry,
  title: 'Karlo UI/KarloMasonry',
};
export default meta;
type Story = StoryObj<typeof KarloMasonry>;

const heights = [150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80];

export const Default: Story = {
  args: {
    columns: 4,
    spacing: 2,
    children: heights.map((h, index) => (
      <KarloBox
        key={index}
        sx={{
          height: h,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          p: 2,
        }}
      >
        <KarloTypography>{index + 1}</KarloTypography>
      </KarloBox>
    )),
  },
};

export const Responsive: Story = {
  args: {
    columns: { xs: 1, sm: 2, md: 3, lg: 4 },
    spacing: 3,
    children: heights.map((h, index) => (
      <KarloBox
        key={index}
        sx={{
          height: h,
          bgcolor: 'secondary.main',
          color: 'secondary.contrastText',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
          p: 2,
        }}
      >
        <KarloTypography>{index + 1}</KarloTypography>
      </KarloBox>
    )),
  },
};
