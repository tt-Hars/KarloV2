import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesSharedHooksProps {}

const StyledModulesSharedHooks = styled.div`
  color: pink;
`;

export function ModulesSharedHooks(props: ModulesSharedHooksProps) {
  return (
    <StyledModulesSharedHooks>
      <h1>Welcome to ModulesSharedHooks!</h1>
    </StyledModulesSharedHooks>
  );
}

export default ModulesSharedHooks;
