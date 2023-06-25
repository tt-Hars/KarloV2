import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LandingProps {}

const StyledLanding = styled.div`
  color: pink;
`;

export function Landing(props: LandingProps) {
  return (
    <StyledLanding>
      <h1>Welcome to Landing!</h1>
      <Outlet></Outlet>
    </StyledLanding>
  );
}

export default Landing;
