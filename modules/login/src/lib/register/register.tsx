import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';
/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: blue;
`;

export function Register(props: RegisterProps) {
  const isRegistered = useLocalStorageManager('registered', false)
  return (
    <StyledRegister>
      <h1>Please register</h1>
      <Button
        onClick={() => isRegistered.action(true)}
        component={Link}
        to="/login"
        size="large"
        variant="outlined"
        endIcon={<ArrowCircleRightOutlinedIcon />}
      >
        Register
      </Button>
    </StyledRegister>
  );
}

export default Register;
