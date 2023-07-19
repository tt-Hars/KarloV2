import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: blue;
`;

export function Login(props: LoginProps) {
  const location = useLocation()
  console.log(location.state)
  const isAuthenticated = useLocalStorageManager('authenticated');
  const isRegistered = useLocalStorageManager('registered');
  const isSubscribed = useLocalStorageManager('subscribed');
  return (
    <StyledLogin>
      {isRegistered.value === false ? (
        <>
          <h1>Please register or login</h1>
          <Button
            component={Link}
            color="secondary"
            to="/register"
            size="large"
          >
            Register
          </Button>
        </>
      ) : (
        <h1>Thank you for registering, Please login here</h1>
      )}

      <Button
        onClick={() => {
          isAuthenticated.action();
          isRegistered.action(true);
          // isSubscribed.action(false);
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
