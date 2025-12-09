import { Grid, GridProps } from '@mui/material';

/**
 * A wrapper around Material UI Grid container with default spacing.
 *
 * @param {GridProps} props - The props for the grid.
 * @returns {JSX.Element} The rendered grid component.
 */
export const KarloGrid = (props: GridProps) => {
  return <Grid container spacing={3} {...props} />;
};
