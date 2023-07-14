import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
  /**
   * Permission check for route
   * @default false
   */
  authenticated?: boolean;
  /**
   * Route to be redirected to
   * @default false
   */
  registered?: boolean;
  /**
   * Route to be redirected to
   * @default false
   */
  subscribed?: boolean;
}

const GuardedRoutePublic = ({
  authenticated = false,
  registered = false,
}: GuardedRouteProps) =>
  !authenticated ? (
    <Outlet />
  ) : registered ? (
    <Navigate to="/payment" replace />
  ) : (
    <Navigate to="/login" replace />
  );

export default GuardedRoutePublic;
