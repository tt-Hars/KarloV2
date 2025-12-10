import React, { useState, useEffect } from 'react';
import FeedCard from './FeedCard';
import {
  KarloMasonry,
  KarloCircularProgress,
  KarloBox,
  KarloTypography
} from '@karlo/modules/shared/ui';
import { useFollowingList, useFollowUser, useUnfollowUser, useAuth } from '@karlo/modules-shared-hooks';

interface FeedItem {
  _id: string;
  type: 'image' | 'text' | 'mixed';
  content: string;
  mediaUrl?: string;
  author: {
    name: string;
    avatar?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface FeedListProps {
  endpoint: string;
  params?: Record<string, string>;
  emptyMessage?: string;
}

const FeedList = ({ endpoint, params = {}, emptyMessage = "No content available." }: FeedListProps) => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Social Graph integration
  const { user } = useAuth();
  // Safe access to user ID
  const userId = (user as any)?.data?._id || (user as any)?._id || (user as any)?.id;
  const { data: followingList = [] } = useFollowingList(userId);
  const followMutation = useFollowUser();
  const unfollowMutation = useUnfollowUser();

  // Serialize params to avoid unnecessary re-fetches if object reference changes but values don't
  const paramsString = new URLSearchParams(params).toString();

  useEffect(() => {
    fetchFeed();
  }, [endpoint, paramsString]);

  const fetchFeed = async () => {
    setLoading(true);
    try {
      // Construct URL with params
      const url = new URL(endpoint, window.location.origin);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

      const response = await fetch(url.toString());
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(`Error fetching feed from ${endpoint}:`, error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id: string) => {
    setItems(prev => prev.map(item =>
        item._id === id ? { ...item, stats: { ...item.stats, likes: item.stats.likes + 1 } } : item
    ));

    try {
        await fetch(`/api/v1/feed/${id}/like`, { method: 'POST' });
    } catch (error) {
        console.error("Failed to like:", error);
    }
  };

  const handleFollowToggle = (authorId: string | undefined) => {
      if (!userId || !authorId) return;

      // If already following, unfollow
      if (followingList.includes(authorId)) {
          unfollowMutation.mutate({ userId, targetId: authorId });
      } else {
          followMutation.mutate({ userId, targetId: authorId });
      }
  };

  if (loading) {
    return (
      <KarloBox display="flex" justifyContent="center" my={5}>
        <KarloCircularProgress />
      </KarloBox>
    );
  }

  if (items.length === 0) {
      return (
          <KarloBox display="flex" justifyContent="center" my={5}>
              <KarloTypography>{emptyMessage}</KarloTypography>
          </KarloBox>
      )
  }

  return (
    <KarloMasonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
      {Array.isArray(items) && items.map((item) => (
        <FeedCard
            key={item._id}
            item={item}
            onLike={() => handleLike(item._id)}
            onFollow={() => handleFollowToggle((item.author as any)._id)} // Casting as author might lack _id in frontend type def
            isFollowing={followingList.includes((item.author as any)._id)}
        />
      ))}
    </KarloMasonry>
  );
};

export default FeedList;
