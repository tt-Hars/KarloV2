import styled from '@emotion/styled';
import { Button, Container, Grid, TextField } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';
import { useEffect, useState } from 'react';
/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: blue;
`;

export function Register(props: RegisterProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const isAuthenticated = useLocalStorageManager('authenticated');
  const isRegistered = useLocalStorageManager('registered');

  async function handleRegister() {
    const resp = await fetch('/api/v1/register', {
      method: 'POST',
      body: JSON.stringify({ email, name: username, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (resp.status === 201) {
      const data = await resp.json();
      window.localStorage.setItem('userId', data.insertedId);
      isAuthenticated.action(true);
      isRegistered.action(true);
      navigate('/payment');
    }
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Grid>
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
        >
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              endIcon={<ArrowCircleRightOutlinedIcon />}
              color="secondary"
              onClick={() => handleRegister()}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Register;
