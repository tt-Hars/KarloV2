import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesWatchProps {}

const StyledModulesWatch = styled.div`
  color: pink;
`;

export function ModulesWatch(props: ModulesWatchProps) {
  return (
    <StyledModulesWatch>
      <h1>Welcome to ModulesWatch!</h1>
    </StyledModulesWatch>
  );
}

export default ModulesWatch;
