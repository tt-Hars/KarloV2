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
  /**
   * Route to be redirected to
   * @default false
   */
  subscribed?: boolean;
}

const GuardedRoutePrivate = ({
  authenticated = false,
  redirectRoute = '/login',
  registered=false,
  subscribed=false
}: GuardedRouteProps) => {

  // if(authenticated && subscribed) {
    return <Outlet></Outlet>
  // } else if(authenticated && !subscribed) {
  //   <Navigate to="/payment" replace />
  // } else {
  //   <Navigate to="/login" replace />
  // }

  // return authenticated ? (
  //   <Outlet />
  // ) : registered ? (
  //   <Navigate to="/payment" replace />
  // ) : (
  //   <Navigate to={redirectRoute} replace />
  // );
};

export default GuardedRoutePrivate;
