import { Card, CardProps, CardContent, CardContentProps, CardMedia, CardMediaProps, CardActions, CardActionsProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

export const KarloCard = (props: CardProps) => {
  return <StyledCard {...props} />;
};

export const KarloCardContent = (props: CardContentProps) => {
  return <CardContent {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KarloCardMedia = (props: CardMediaProps | any) => {
  return <CardMedia {...props} />;
};

export const KarloCardActions = (props: CardActionsProps) => {
    return <CardActions {...props} />;
}
