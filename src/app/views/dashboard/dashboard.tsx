import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
  height: 100vh;
`;


export function Dashboard(props: DashboardProps) {
  const isSubscribed = useLocalStorageManager('subscribed');
  const navigate = useNavigate()
  useEffect(() => {
    console.log(isSubscribed.value)
    // if(isSubscribed.value === false) navigate('/payment')
  }, [isSubscribed, navigate])
  return (
    <StyledDashboard>
      <Grid height="100%" width="100vw" container>
        <Grid
          item
          flexDirection="column"
          height="100%"
          width="100vw"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="background.default"
        >
          <Typography variant='h4'>Weclome, User!</Typography>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </StyledDashboard>
  );
}

export default Dashboard;
