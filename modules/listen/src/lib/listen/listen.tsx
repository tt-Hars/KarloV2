import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ListenProps {}

const StyledListen = styled.div`
  color: pink;
`;

export function Listen(props: ListenProps) {
  const location = useLocation()
  console.log(location.state)
  return (
    <StyledListen>
      <h1>Welcome to Listen!</h1>
    </StyledListen>
  );
}

export default Listen;
