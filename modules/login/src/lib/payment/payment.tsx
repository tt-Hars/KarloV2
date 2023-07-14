import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';

/* eslint-disable-next-line */
export interface PaymentProps {}

const StyledPayment = styled.div`
  color: blue;
`;

export function Payment(props: PaymentProps) {
  const isAuthenticated = useLocalStorageManager('authenticated', false);
  const isRegistered = useLocalStorageManager('registered', false);
  const isSubscribed = useLocalStorageManager('subscribed', false);
  return (
    <StyledPayment>
      {isRegistered.value ? (
        <>
          <h1>You've successfully registered, please make the payment</h1>
          <Button
            onClick={() => {
              isAuthenticated.action(true);
              isSubscribed.action(true);
            }}
            component={Link}
            to="/home"
            size="large"
            variant="outlined"
            endIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Pay
          </Button>
        </>
      ) : (
        <>
          <h1>You need to register before payment</h1>
          <Button
            component={Link}
            to="/register"
            size="large"
            variant="outlined"
            endIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Register
          </Button>
        </>
      )}
    </StyledPayment>
  );
}

export default Payment;
