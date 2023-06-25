import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface WatchProps {}

const StyledWatch = styled.div`
  color: pink;
`;

export function Watch(props: WatchProps) {
  return (
    <StyledWatch>
      <h1>Welcome to Watch!</h1>
    </StyledWatch>
  );
}

export default Watch;
