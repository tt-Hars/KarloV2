import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: blue;
`;

export function Login(props: LoginProps) {
  return (
    <StyledLogin>
      <h1>Welcome to Login!</h1>
      <Button
        component={Link}
        color="secondary"
        to="/register"
        size="large"
        endIcon={<ArrowCircleRightOutlinedIcon />}
      >
        Register
      </Button>
      <Button
        component={Link}
        to="/welcome"
        variant="outlined"
        size="large"
        endIcon={<ArrowCircleRightOutlinedIcon />}
      >
        Login
      </Button>
    </StyledLogin>
  );
}

export default Login;
