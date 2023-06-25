import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ListenProps {}

const StyledListen = styled.div`
  color: pink;
`;

export function Listen(props: ListenProps) {
  return (
    <StyledListen>
      <h1>Welcome to Listen!</h1>
    </StyledListen>
  );
}

export default Listen;
