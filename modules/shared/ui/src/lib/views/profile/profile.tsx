import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
  Paper,
  Grid,
  Avatar,
  Divider,
  Button
} from '@mui/material';
import { useAuthContext, useLocalStorageManager } from '@karlo/modules-shared-hooks';
import { useSearchParams } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');

  const [value, setValue] = useState(0);
  const { user } = useAuthContext() || {};
  const isSubscribed = useLocalStorageManager('subscribed');

  useEffect(() => {
    if (tabParam === 'subscriptions') {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [tabParam]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setSearchParams({ tab: newValue === 1 ? 'subscriptions' : 'profile' });
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="profile tabs">
            <Tab label="Profile Details" />
            <Tab label="My Subscriptions" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Grid container spacing={2}>
            <Grid item xs={12} display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ width: 100, height: 100, mb: 2 }}>{user?.name?.charAt(0).toUpperCase() || 'U'}</Avatar>
              <Typography variant="h5">{user?.name || 'User'}</Typography>
              <Typography variant="body1" color="text.secondary">{user?.email || 'user@example.com'}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom>Account Information</Typography>
              <Typography variant="body1"><strong>Name:</strong> {user?.name || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Email:</strong> {user?.email || 'N/A'}</Typography>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>Subscription Status</Typography>
          <Box sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
            <Typography variant="body1" gutterBottom>
              {isSubscribed.value ? 'You are currently subscribed to the Premium Plan.' : 'You are not currently subscribed.'}
            </Typography>
            <Button variant="contained" color={isSubscribed.value ? "secondary" : "primary"} sx={{ mt: 2 }}>
              {isSubscribed.value ? 'Manage Subscription' : 'Upgrade to Premium'}
            </Button>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default Profile;
