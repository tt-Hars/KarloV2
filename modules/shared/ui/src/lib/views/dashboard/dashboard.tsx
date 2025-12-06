import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { useLocalStorageManager } from '@karlo/modules-shared-hooks';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: primary;
  min-height: calc(100vh - 112px);
`;


export function Dashboard(props: DashboardProps) {
  const [data, setData] = useState({} as {message: string})
  const isSubscribed = useLocalStorageManager('subscribed');
  const navigate = useNavigate()
  useEffect(() => {
    console.log(isSubscribed.value)
    // if(isSubscribed.value === false) navigate('/payment')
  }, [isSubscribed, navigate])
  useEffect(() => {
    fetch('/api').then(data => data.json()).then(data => setData(data))
  }, [])
  console.log(data); // Using data
  return (
    <StyledDashboard>
      <Grid minHeight='calc(100vh - 112px)' height="100%" container>
        <Grid
          item
          flexDirection="column"
          height="calc(100% - 40px)"
          width="100%"
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
