import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FeedProps {}

const StyledFeed = styled.div`
  color: pink;
`;

/**
 * Feed component.
 *
 * @param {FeedProps} props - The component props.
 * @returns {JSX.Element} The rendered Feed component.
 */
export function Feed(props: FeedProps) {
  return (
    <StyledFeed>
      <h1>Welcome to Feed!</h1>
    </StyledFeed>
  );
}

export default Feed;
