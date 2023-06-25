import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesListenProps {}

const StyledModulesListen = styled.div`
  color: pink;
`;

export function ModulesListen(props: ModulesListenProps) {
  return (
    <StyledModulesListen>
      <h1>Welcome to ModulesListen!</h1>
    </StyledModulesListen>
  );
}

export default ModulesListen;
