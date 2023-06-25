import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ReadProps {}

const StyledRead = styled.div`
  color: pink;
`;

export function Read(props: ReadProps) {
  return (
    <StyledRead>
      <h1>Welcome to Read!</h1>
    </StyledRead>
  );
}

export default Read;
