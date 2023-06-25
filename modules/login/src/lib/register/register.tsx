import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: pink;
`;

export function Register(props: RegisterProps) {
  return (
    <StyledRegister>
      <h1>Welcome to Register!</h1>
    </StyledRegister>
  );
}

export default Register;
