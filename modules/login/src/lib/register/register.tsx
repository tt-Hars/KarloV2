import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useState } from 'react';
import { useRegister } from '@karlo/modules-shared-hooks';
import { KarloButton, KarloContainer, KarloGrid, KarloTextField } from '@karlo/modules/shared/ui';

/* eslint-disable-next-line */
export interface RegisterProps {}

export function Register(props: RegisterProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {mutate: register} = useRegister();
  

  async function handleRegister() {
    register({email, password, name: username});
  }

  return (
    <KarloContainer maxWidth="sm">
      <KarloGrid container spacing={4} direction="column" alignItems="center">
        <KarloGrid item xs={12} sx={{ width: '100%' }}>
          <KarloTextField
            required
            fullWidth
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 3 }}
          />
        </KarloGrid>
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

        <KarloGrid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <KarloButton
              variant="outlined"
              size="large"
              endIcon={<ArrowCircleRightOutlinedIcon />}
              color="secondary"
              onClick={() => handleRegister()}
              sx={{ minWidth: 200 }}
            >
              Register
            </KarloButton>
        </KarloGrid>
      </KarloGrid>
    </KarloContainer>
  );
}

export default Register;
