import styled from '@emotion/styled';
import { Outlet } from 'react-router-dom';

/* eslint-disable-next-line */
export interface DashboardProps {}

const StyledDashboard = styled.div`
  color: pink;
`;

export function Dashboard(props: DashboardProps) {
  return (
    <StyledDashboard>
      <h1>Welcome to Dashboard!</h1>
      <Outlet></Outlet>
    </StyledDashboard>
  );
}

export default Dashboard;
