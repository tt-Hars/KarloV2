import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: blue;
`;

export function Register(props: RegisterProps) {
  return (
    <StyledRegister>
      <h1>Please register</h1>
      <Button
        onClick={() => localStorage.setItem('registered', 'true')}
        component={Link}
        to="/payment"
        size="large"
        variant="outlined"
        endIcon={<ArrowCircleRightOutlinedIcon />}
      >
        Register
      </Button>
    </StyledRegister>
  );
}

export default Register;
