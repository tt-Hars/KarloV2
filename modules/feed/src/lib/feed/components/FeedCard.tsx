import React from 'react';
import {
  KarloCard,
  KarloCardContent,
  KarloCardMedia,
  KarloCardActions,
  KarloBox,
  KarloAvatar,
  KarloTypography,
  KarloIconButton,
  KarloFavoriteBorderIcon,
  KarloChatBubbleOutlineIcon,
  KarloShareIcon
} from '@karlo/modules/shared/ui';

interface FeedItemProps {
  item: {
    _id: string;
    type: string;
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
  };
  onLike: () => void;
}

const FeedCard: React.FC<FeedItemProps> = ({ item, onLike }) => {
  return (
    <KarloCard>
      {item.type === 'image' && item.mediaUrl && (
        <KarloCardMedia
          component="img"
          image={item.mediaUrl}
          alt="Post image"
          sx={{ objectFit: 'cover' }}
        />
      )}

      <KarloCardContent>
        <KarloBox display="flex" alignItems="center" mb={1}>
            <KarloAvatar sx={{ width: 24, height: 24, mr: 1 }} src={item.author.avatar}>{item.author.name[0]}</KarloAvatar>
             <KarloTypography variant="subtitle2" color="text.secondary">
                {item.author.name}
            </KarloTypography>
        </KarloBox>
        <KarloTypography variant="body1" sx={{ fontWeight: item.type === 'text' ? 'bold' : 'normal' }}>
          {item.content}
        </KarloTypography>
      </KarloCardContent>

      <KarloCardActions disableSpacing sx={{ justifyContent: 'space-between', px: 2 }}>
        <KarloBox display="flex" alignItems="center">
            <KarloIconButton size="small" onClick={onLike}>
                <KarloFavoriteBorderIcon fontSize="small" />
            </KarloIconButton>
            <KarloTypography variant="caption" sx={{ ml: 0.5, mr: 2 }}>{item.stats.likes}</KarloTypography>

             <KarloIconButton size="small">
                <KarloChatBubbleOutlineIcon fontSize="small" />
            </KarloIconButton>
             <KarloTypography variant="caption" sx={{ ml: 0.5 }}>{item.stats.comments}</KarloTypography>
        </KarloBox>
         <KarloIconButton size="small">
            <KarloShareIcon fontSize="small" />
        </KarloIconButton>
      </KarloCardActions>
    </KarloCard>
  );
};

export default FeedCard;
