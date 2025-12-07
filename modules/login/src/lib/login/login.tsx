import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorageManager, useLogin } from '@karlo/modules-shared-hooks';
import { useState } from 'react';
import { KarloButton, KarloContainer, KarloGrid, KarloTextField, KarloTypography } from '@karlo/modules/shared/ui';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const location = useLocation();
  console.log(location.state);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {mutate: login} = useLogin();

  const isRegistered = useLocalStorageManager('registered');

  async function handleLogin() {
    login({email, password});
  }

  return (
    <KarloContainer maxWidth="sm">
      <KarloGrid container spacing={4} direction="column" alignItems="center">
        <KarloGrid item xs={12} sx={{ width: '100%' }}>
          <KarloTextField
            required
            fullWidth
            label="Email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
        </KarloGrid>
        <KarloGrid item xs={12} sx={{ width: '100%' }}>
          <KarloTextField
            fullWidth
            required
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 4 }}
          />
        </KarloGrid>

        <KarloGrid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {!isRegistered.value ? (
            <KarloButton
              component={Link}
              color="secondary"
              to="/register"
              size="large"
              sx={{ minWidth: 200 }}
            >
              Register
            </KarloButton>
          ) : (
            <KarloTypography variant="h5" align="center" gutterBottom>
              Thank you for registering, Please login here
            </KarloTypography>
          )}

          <KarloButton
            variant="outlined"
            size="large"
            endIcon={<ArrowCircleRightOutlinedIcon />}
            onClick={() => handleLogin()}
            sx={{ minWidth: 200 }}
          >
            Login
          </KarloButton>
        </KarloGrid>
      </KarloGrid>
    </KarloContainer>
  );
}

export default Login;
