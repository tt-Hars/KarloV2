import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';

/* eslint-disable-next-line */
export interface PaymentProps {}

const StyledPayment = styled.div`
  color: blue;
`;

export function Payment(props: PaymentProps) {
  const location = useLocation()
  console.log(location.state)
  const isAuthenticated = useLocalStorageManager('authenticated', false);
  const isRegistered = useLocalStorageManager('registered', false);
  const isSubscribed = useLocalStorageManager('subscribed', false);
  return (
    <StyledPayment>
        <>
          <h1>You've successfully registered, please make the payment</h1>
          <Button
            onClick={() => {
              isSubscribed.action(true);
            }}
            component={Link}
            to={location.state ?? '/'}
            size="large"
            variant="outlined"
            endIcon={<ArrowCircleRightOutlinedIcon />}
          >
            Pay
          </Button>
        </>
    </StyledPayment>
  );
}

export default Payment;
