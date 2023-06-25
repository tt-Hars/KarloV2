import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface PageNotFoundProps {}

const StyledPageNotFound = styled.div`
  color: pink;
`;

export function PageNotFound(props: PageNotFoundProps) {
  return (
    <StyledPageNotFound>
      <h1>Welcome to PageNotFound!</h1>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
