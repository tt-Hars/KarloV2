import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

/* eslint-disable-next-line */
export interface PaymentProps {}

const StyledPayment = styled.div`
  color: blue;
`;

export function Payment(props: PaymentProps) {
  const isAuthenticated = !!localStorage.getItem('authenticated');
  const isSubscribed = !!localStorage.getItem('subscribed');
  return (
    <StyledPayment>
      <h1>You've successfully registered, please make the payment</h1>
      {isAuthenticated && isSubscribed ? (
        <Button
          onClick={() => {
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('subscribed', 'true');
          }}
          component={Link}
          to="/dashboard"
          size="large"
          variant="outlined"
          endIcon={<ArrowCircleRightOutlinedIcon />}
        >
          Home
        </Button>
      ) : (
        <Button
          onClick={() => localStorage.setItem('subscribed', 'true')}
          size="large"
          variant="outlined"
          endIcon={<ArrowCircleRightOutlinedIcon />}
        >
          Pay
        </Button>
      )}
    </StyledPayment>
  );
}

export default Payment;
