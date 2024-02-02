import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { useLocalStorageManager } from '@karlo/modules/shared/hooks';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: primary;
  min-height: calc(100vh - 112px);
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
      <Grid minHeight='calc(100vh - 112px)' height="100%" container>
        <Grid
          item
          flexDirection="column"
          height="calc(100% - 40px)"
          width="xl"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="background.default"
          my="20px"
          minHeight='calc(100vh - 152px)'
        >
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </StyledDashboard>
  );
}

export default Dashboard;
