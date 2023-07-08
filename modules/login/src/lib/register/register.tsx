import styled from '@emotion/styled';
import { Button } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Link } from 'react-router-dom';
/* eslint-disable-next-line */
export interface RegisterProps {}

const StyledRegister = styled.div`
  color: blue;
`;

export function Register(props: RegisterProps) {
  return (
    <StyledRegister>
      <h1>Welcome to Register!</h1>
      <Button
        component={Link}
        to="/register"
        size="large"
        variant="outlined"
        endIcon={<ArrowCircleRightOutlinedIcon />}
      >
        Make payment
      </Button>
    </StyledRegister>
  );
}

export default Register;
