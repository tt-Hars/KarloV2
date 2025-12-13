import React, { useState } from 'react';
import FeedList from './components/FeedList';
import {
  KarloContainer,
  KarloTypography,
  KarloButton,
  KarloTextField,
  KarloBox,
  KarloFab,
  KarloModal,
  KarloAddIcon,
  KarloMenuItem
} from '@karlo/modules/shared/ui';
import { useAuth } from '@karlo/modules-shared-hooks';
import { Tabs, Tab } from '@mui/material';

export const FeedView = () => {
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [newPost, setNewPost] = useState({ type: 'text', content: '', mediaUrl: '' });

  const { user } = useAuth();
  const userId = (user as any)?.data?.id || (user as any)?._id || (user as any)?.id;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      window.location.reload();
    } catch (error) {
       console.error('Error creating post:', error);
    }
  };

  return (
    <KarloContainer maxWidth="xl" sx={{ py: 2 }}>
      <KarloTypography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
        Your Feed
      </KarloTypography>

      <KarloBox sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="feed tabs" centered>
          <Tab label="Explore" />
          <Tab label="Following" />
          <Tab label="My Posts" />
        </Tabs>
      </KarloBox>

      {tabValue === 0 && (
        <FeedList
            endpoint="/api/v1/feed/explore"
            emptyMessage="No explore content available."
        />
      )}
      {tabValue === 1 && (
        <FeedList
            endpoint="/api/v1/feed/following"
            emptyMessage="You are not following anyone yet."
        />
      )}
      {tabValue === 2 && userId && (
        <FeedList
            endpoint="/api/v1/feed/myposts"
            params={{ userId }}
            emptyMessage="You haven't posted anything yet."
        />
      )}
      {tabValue === 2 && !userId && (
        <KarloTypography>Please log in to see your posts.</KarloTypography>
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
