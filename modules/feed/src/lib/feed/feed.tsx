import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeedProps {}

const StyledFeed = styled.div`
  color: pink;
`;

export function Feed(props: FeedProps) {
  return (
    <StyledFeed>
      <h1>Welcome to Feed!</h1>
    </StyledFeed>
  );
}

export default Feed;
