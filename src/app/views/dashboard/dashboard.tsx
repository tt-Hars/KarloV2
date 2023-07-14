import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
  height: 100vh;
`;

export function Dashboard(props: DashboardProps) {
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
          bgcolor="#eee"
        >
          <Typography variant='h4'>Weclome, User!</Typography>
          <Outlet></Outlet>
        </Grid>
      </Grid>
    </StyledDashboard>
  );
}

export default Dashboard;
