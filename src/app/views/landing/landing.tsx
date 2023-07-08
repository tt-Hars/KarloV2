import styled from '@emotion/styled';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';

/* eslint-disable-next-line */
export interface LandingProps {}

const StyledLanding = styled.div`
  height: 100vh;
`;

export function Landing(props: LandingProps) {
  return (
    <StyledLanding>
      <Grid height='100%' width='100vw' container >
      <Grid item
        flexDirection="column"
        height="100%"
        width="100vw"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#eee"
      >
        <Outlet></Outlet>
      </Grid>
      </Grid>
    </StyledLanding>
  );
}

export default Landing;
