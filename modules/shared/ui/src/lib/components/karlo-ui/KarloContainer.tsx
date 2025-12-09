import { Container, ContainerProps } from '@mui/material';

/**
 * A wrapper around Material UI Container with default styling.
 *
 * @param {ContainerProps} props - The props for the container.
 * @returns {JSX.Element} The rendered container component.
 */
export const KarloContainer = (props: ContainerProps) => {
  return <Container maxWidth="lg" sx={{ py: 4, ...props.sx }} {...props} />;
};
