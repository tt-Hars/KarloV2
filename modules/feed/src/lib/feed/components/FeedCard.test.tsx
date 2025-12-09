import { render, screen, fireEvent } from '@testing-library/react';
import FeedCard from './FeedCard';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const mockItem = {
  _id: '1',
  type: 'text',
  content: 'Test content',
  author: {
    name: 'Tester',
  },
  stats: {
    likes: 0,
    comments: 0,
    shares: 0,
  },
};

describe('FeedCard', () => {
  it('renders content correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <FeedCard item={mockItem} onLike={() => {}} />
      </ThemeProvider>
    );

    expect(screen.getByText('Test content')).toBeTruthy();
    expect(screen.getByText('Tester')).toBeTruthy();
  });

  it('calls onLike when heart is clicked', () => {
    const onLike = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <FeedCard item={mockItem} onLike={onLike} />
      </ThemeProvider>
    );

    const likeButtons = screen.getAllByRole('button');
    // The first button in the actions area is the like button (index 0)
    fireEvent.click(likeButtons[0]);

    expect(onLike).toHaveBeenCalledTimes(1);
  });
});
