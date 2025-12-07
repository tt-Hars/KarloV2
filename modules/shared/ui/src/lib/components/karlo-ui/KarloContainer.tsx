import { Container, ContainerProps } from '@mui/material';

export const KarloContainer = (props: ContainerProps) => {
  return <Container maxWidth="lg" sx={{ py: 4, ...props.sx }} {...props} />;
};
