import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ModulesLoginProps {}

const StyledModulesLogin = styled.div`
  color: pink;
`;

export function ModulesLogin(props: ModulesLoginProps) {
  return (
    <StyledModulesLogin>
      <h1>Welcome to ModulesLogin!</h1>
    </StyledModulesLogin>
  );
}

export default ModulesLogin;
