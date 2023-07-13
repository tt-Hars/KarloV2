import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import {useLocalStorageManager} from '@myreactapp/modules/shared/hooks'

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: blue;
`;

export function Login(props: LoginProps) {
  const isAuthenticated = useLocalStorageManager('authenticated', false)
  return (
    <StyledLogin>
      <h1>Please register or login</h1>
      <Button component={Link} color="secondary" to="/register" size="large">
        Register
      </Button>
      <Button
        onClick={() => {
          isAuthenticated.action()
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
