import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesSharedUiProps {}

const StyledModulesSharedUi = styled.div`
  color: pink;
`;

export function ModulesSharedUi(props: ModulesSharedUiProps) {
  return (
    <StyledModulesSharedUi>
      <h1>Welcome to ModulesSharedUi!</h1>
    </StyledModulesSharedUi>
  );
}

export default ModulesSharedUi;
