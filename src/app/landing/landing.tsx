import styled from '@emotion/styled';
import { Box, Button, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import {MainHeading, Navbar} from '@myreactapp/modules/shared/ui'

/* eslint-disable-next-line */
export interface LandingProps {}

const StyledLanding = styled.div`
  height: 100vh;
`;

export function Landing(props: LandingProps) {
  return (
    <StyledLanding>
      <Box
        flexDirection="column"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="#eee"
      >
        <Navbar></Navbar>
        <Outlet></Outlet>
      </Box>
    </StyledLanding>
  );
}

export default Landing;
