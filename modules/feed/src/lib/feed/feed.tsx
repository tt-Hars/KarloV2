import React, { useState, useEffect } from 'react';
import FeedCard from './components/FeedCard';
import {
  KarloContainer,
  KarloTypography,
  KarloButton,
  KarloTextField,
  KarloBox,
  KarloMasonry,
  KarloCircularProgress,
  KarloFab,
  KarloModal,
  KarloAddIcon,
  KarloMenuItem
} from '@karlo/modules/shared/ui';

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

export const FeedView = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'text', content: '', mediaUrl: '' });

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await fetch('/api/v1/feed');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await fetch('/api/v1/feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      setOpen(false);
      setNewPost({ type: 'text', content: '', mediaUrl: '' });
      fetchFeed();
    } catch (error) {
       console.error('Error creating post:', error);
    }
  };

  const handleLike = async (id: string) => {
      // Optimistic update
      setItems(prev => prev.map(item =>
          item._id === id ? { ...item, stats: { ...item.stats, likes: item.stats.likes + 1 } } : item
      ));

      try {
          await fetch(`/api/v1/feed/${id}/like`, { method: 'POST' });
      } catch (error) {
          console.error("Failed to like:", error);
          // Revert if needed
      }
  }

  return (
    <KarloContainer maxWidth="xl" sx={{ py: 4 }}>
      <KarloTypography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Your Feed
      </KarloTypography>

      {loading ? (
        <KarloBox display="flex" justifyContent="center" my={5}>
          <KarloCircularProgress />
        </KarloBox>
      ) : (
        <KarloMasonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={3}>
          {Array.isArray(items) && items?.map((item) => (
            <FeedCard key={item._id} item={item} onLike={() => handleLike(item._id)} />
          ))}
        </KarloMasonry>
      )}

      <KarloFab color="primary" sx={{ position: 'fixed', bottom: 32, right: 32 }} onClick={() => setOpen(true)}>
        <KarloAddIcon />
      </KarloFab>

      <KarloModal open={open} onClose={() => setOpen(false)}>
        <KarloBox sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}>
          <KarloTypography variant="h6" mb={2}>Create Post</KarloTypography>
          <KarloTextField
            select
            label="Type"
            fullWidth
            value={newPost.type}
            onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
            sx={{ mb: 2 }}
          >
            <KarloMenuItem value="text">Text</KarloMenuItem>
            <KarloMenuItem value="image">Image</KarloMenuItem>
          </KarloTextField>
          <KarloTextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            sx={{ mb: 2 }}
          />
           {newPost.type === 'image' && (
             <KarloTextField
                label="Image URL"
                fullWidth
                value={newPost.mediaUrl}
                onChange={(e) => setNewPost({ ...newPost, mediaUrl: e.target.value })}
                sx={{ mb: 2 }}
              />
           )}
          <KarloButton variant="contained" fullWidth onClick={handleCreate}>Post</KarloButton>
        </KarloBox>
      </KarloModal>
    </KarloContainer>
  );
};

export default FeedView;
