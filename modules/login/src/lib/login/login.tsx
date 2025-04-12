import styled from '@emotion/styled';
import { Button, Container, Grid, TextField } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';
import { useState } from 'react';

/* eslint-disable-next-line */
export interface LoginProps {}

const StyledLogin = styled.div`
  color: blue;
`;


export function Login(props: LoginProps) {
  const location = useLocation();
  console.log(location.state);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  
  const isAuthenticated = useLocalStorageManager('authenticated');
  const isRegistered = useLocalStorageManager('registered');
  const isSubscribed = useLocalStorageManager('subscribed');
  async function handleLogin() {
    const resp = await fetch('/api/v1/one_login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (resp.status === 200) {
      const data = await resp.json();
      window.localStorage.setItem('userId', data._id);
      isAuthenticated.action(true);
      isRegistered.action(true);
      navigate('/payment');
    }
  
    // isSubscribed.action(false);
  }

  return (
    <StyledLogin>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          ></Grid>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!isRegistered.value ? (
            <>
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
            variant="outlined"
            size="large"
            endIcon={<ArrowCircleRightOutlinedIcon />}
            onClick={() => handleLogin()}
          >
            Login
          </Button>
        </Grid>
      </Container>
    </StyledLogin>
  );
}

export default Login;
