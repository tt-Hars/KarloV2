import { Navigate, Outlet } from 'react-router-dom';

interface GuardedRouteProps {
  /**
   * Permission check for route
   * @default false
   */
  authenticated?: boolean;
  /**
   * Route to be redirected to
   * @default '/'
   */
  redirectRoute?: string;
  /**
   * Route to be redirected to
   * @default false
   */
  registered?: boolean;
}

const GuardedRoutePrivate = ({
  authenticated = false,
  redirectRoute = '/login',
  registered=false
}: GuardedRouteProps) => {
  console.log(authenticated);
  return authenticated ? (
    <Outlet />
  ) : registered ? (
    <Navigate to="/payment" replace />
  ) : (
    <Navigate to={redirectRoute} replace />
  );
};

export default GuardedRoutePrivate;
