import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none',
  padding: theme.spacing(1, 3), // Standard padding: 8px vertical, 24px horizontal
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
}));

// Flexible props to allow Router Link props like 'to'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type KarloButtonProps = ButtonProps & { [key: string]: any };

export const KarloButton = (props: KarloButtonProps) => {
  return <StyledButton {...props} />;
};
