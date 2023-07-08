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
      <h1>Please register or login</h1>
      <Button component={Link} color="secondary" to="/register" size="large">
        Register
      </Button>
      <Button
        onClick={() => {
          localStorage.setItem('authenticated', 'true');
        }}
        component={Link}
        to="/"
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
