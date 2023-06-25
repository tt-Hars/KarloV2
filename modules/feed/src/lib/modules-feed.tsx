import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesFeedProps {}

const StyledModulesFeed = styled.div`
  color: pink;
`;

export function ModulesFeed(props: ModulesFeedProps) {
  return (
    <StyledModulesFeed>
      <h1>Welcome to ModulesFeed!</h1>
    </StyledModulesFeed>
  );
}

export default ModulesFeed;
