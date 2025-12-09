import { Typography, TypographyProps } from '@mui/material';

/**
 * A wrapper around Material UI Typography component.
 *
 * @param {TypographyProps} props - The props for the typography.
 * @returns {JSX.Element} The rendered typography component.
 */
export const KarloTypography = (props: TypographyProps) => {
  return <Typography {...props} />;
};
