import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LandingProps {}

const StyledLanding = styled.div`
  min-height: calc(100vh - 112px);
`;

export function Landing(props: LandingProps) {
  return (
    <StyledLanding>
      <Grid minHeight='calc(100vh - 112px)' width='100%' container >
      <Grid item
        flexDirection="column"
        height="calc(100% - 40px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="background.default"
        my='20px'
        minHeight='calc(100vh - 152px)'
      >
        <Outlet></Outlet>
      </Grid>
      </Grid>
    </StyledLanding>
  );
}

export default Landing;
