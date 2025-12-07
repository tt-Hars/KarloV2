import type { Meta, StoryObj } from '@storybook/react';
import { TileCard } from './tile-card';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta: Meta<typeof TileCard> = {
  component: TileCard,
  title: 'Shared/UI/TileCard',
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TileCard>;

export const Default: Story = {
  args: {
    label: 'Watch',
    content: 'Watch your favorite movies and shows.',
    route: '_watch',
  },
};

export const Listen: Story = {
  args: {
    label: 'Listen',
    content: 'Listen to music and podcasts.',
    route: '_listen',
  },
};
