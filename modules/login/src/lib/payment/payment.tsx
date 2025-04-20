import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, Tab, Tabs } from '@mui/material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PaymentProps {
  // Add any necessary props here
}

interface SuccessProps {
  onManageBilling: () => void;
  sessionId: string;
  userId: string;
  subscriptionLevel: string;
}

interface CancelledProps {
  onContinueShopping: () => void;
  message: string;
}

const Payment: React.FC<PaymentProps> = () => {
  const [products, setProducts] = useState<{
    data: [{ default_price: string; metadata: { meta_name: string } }];
  }>({ data: [{ default_price: '', metadata: { meta_name: '' } }] });
  const [subscriptionType, setSubscriptionType] = useState<
    'BASIC_E' | 'BASIC_P' | 'PREMIUM'
  >('PREMIUM');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      // @ts-expect-error query
      setSessionId(query.get('session_id'));
      setSuccess(true);
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready.",
      );
    }
  }, [sessionId]);

  useEffect(() => {
    /* create a function taking method, url, params, headers
     * all apis should be called from there, can be used as an inteceptor too*/
    fetch('/api/v1/get_products')
      .then((data) => data.json())
      .then((products) => setProducts(products));
  }, []);

  const handleSubscriptionChange = (
    event: React.SyntheticEvent,
    newValue: 'BASIC_E' | 'BASIC_P' | 'PREMIUM',
  ) => {
    setSubscriptionType(newValue);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onContinueShopping = () => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onManageBilling = () => {};

  const Subscribe = () => (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Choose a Subscription Plan
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={subscriptionType}
          onChange={handleSubscriptionChange}
          centered
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Basic (Entertainment)" value="BASIC_E" />
          <Tab label="Basic (Productivity)" value="BASIC_P" />
          <Tab label="Premium" value="PREMIUM" />
        </Tabs>
      </Box>
      <Box sx={{ p: 2 }}>
        {subscriptionType === 'BASIC_E' && (
          <Typography variant="body1">
            Basic (E) subscription description goes here.
          </Typography>
        )}
        {subscriptionType === 'BASIC_P' && (
          <Typography variant="body1">
            Basic (P) subscription description goes here.
          </Typography>
        )}
        {subscriptionType === 'PREMIUM' && (
          <Typography variant="body1">
            Premium subscription description goes here.
          </Typography>
        )}
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            size="large"
            variant="outlined"
            endIcon={<ArrowCircleRightOutlinedIcon />}
            onClick={handlePaymentInitiation}
          >
            Initiate Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );

  const Success: React.FC<SuccessProps> = ({
    onManageBilling,
    sessionId,
    userId,
    subscriptionLevel,
  }) => {
    // const isSubscribed = useLocalStorageManager('subscribed');
    useEffect(() => {
      fetch('/api/v1/update_user_data', {
        method: 'POST',
        body: JSON.stringify({
          session_id: sessionId,
          _id: userId,
          subscription_level: subscriptionLevel,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => console.log('User data updated'));
    }, [sessionId]);
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment Successful
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Thank you for your subscription!
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={onManageBilling}>
            Manage Billing
          </Button>
        </Box>
      </Box>
    );
  };

  const Cancelled: React.FC<CancelledProps> = ({
    onContinueShopping,
    message,
  }) => {
    return (
      <Box sx={{ maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payment Cancelled
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Order cancelled. Continue shopping and checkout when you're ready.
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    );
  };

  const handlePaymentInitiation = async () => {
    const productId =
      products.data.find(
        (product) => product.metadata.meta_name === subscriptionType,
      )?.default_price ?? '';
    console.log(productId);
    const res = await fetch('/api/v1/create_checkout_session', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await res.json();
    window.location.href = body;
  };

  if (!success && message === '') {
    return <Subscribe />;
  } else if (success && sessionId !== '') {
    const userId = window.localStorage.getItem('userId'); // local cache or server cache or db
    return (
      <Success
        onManageBilling={onManageBilling}
        sessionId={sessionId}
        userId={userId || ''}
        subscriptionLevel={subscriptionType}
      />
    );
  } else {
    return (
      <Cancelled onContinueShopping={onContinueShopping} message={message} />
    );
  }
};

export default Payment;
