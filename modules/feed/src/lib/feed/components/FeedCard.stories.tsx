import type { Meta, StoryObj } from '@storybook/react';
import FeedCard from './FeedCard';

const meta: Meta<typeof FeedCard> = {
  component: FeedCard,
  title: 'Feeds/FeedCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FeedCard>;

const mockItemText = {
  _id: '1',
  type: 'text',
  content: 'This is a text post discussing something interesting.',
  author: {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
  stats: {
    likes: 12,
    comments: 5,
    shares: 2,
  },
};

const mockItemImage = {
  _id: '2',
  type: 'image',
  content: 'Beautiful scenery!',
  mediaUrl: 'https://picsum.photos/400/600',
  author: {
    name: 'Jane Smith',
  },
  stats: {
    likes: 120,
    comments: 15,
    shares: 22,
  },
};

export const TextPost: Story = {
  args: {
    item: mockItemText,
    onLike: () => alert('Liked!'),
  },
};

export const ImagePost: Story = {
  args: {
    item: mockItemImage,
    onLike: () => alert('Liked!'),
  },
};
