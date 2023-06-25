import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface WriteProps {}

const StyledWrite = styled.div`
  color: pink;
`;

export function Write(props: WriteProps) {
  return (
    <StyledWrite>
      <h1>Welcome to Write!</h1>
    </StyledWrite>
  );
}

export default Write;
