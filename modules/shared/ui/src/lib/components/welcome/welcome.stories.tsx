import type { Meta, StoryObj } from '@storybook/react';
import { Welcome } from './welcome';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const theme = createTheme();

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  title: 'Shared/UI/Welcome',
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
type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
