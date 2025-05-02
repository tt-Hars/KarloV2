import styled from '@emotion/styled';
import { Button, Container, Grid, TextField } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorageManager, useLogin } from '@karlo/modules-shared-hooks';
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
  const {mutate: login} = useLogin();

  
  const isRegistered = useLocalStorageManager('registered');
  async function handleLogin() {
    login({email, password});
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
