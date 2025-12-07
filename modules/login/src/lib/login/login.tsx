import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useLocation } from 'react-router-dom';
import { useLocalStorageManager, useLogin, useProviderLogin } from '@karlo/modules-shared-hooks';
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
  const {mutate: providerLogin} = useProviderLogin();

  const isRegistered = useLocalStorageManager('registered');

  async function handleLogin() {
    login({email, password});
  }

  async function handleGoogleLogin() {
    // Mock Google Login for now - In reality, this would use Google Identity Services SDK
    // to get a token, then verify on backend.
    // For this skeleton, we assume we got user info.
    providerLogin({
      email: 'mock_google_user@example.com',
      name: 'Mock Google User',
      provider: 'GOOGLE',
      providerId: 'mock_google_id_123'
    });
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

          <KarloTypography variant="body2" color="textSecondary">OR</KarloTypography>

          <KarloButton
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            onClick={() => handleGoogleLogin()}
            sx={{ minWidth: 200 }}
          >
            Login with Google
          </KarloButton>
        </KarloGrid>
      </KarloGrid>
    </KarloContainer>
  );
}

export default Login;
