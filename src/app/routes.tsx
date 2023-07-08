import { Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import {
  Dashboard,
  Landing,
  PageNotFound,
  Login,
  Register,
  Payment,
  Watch,
  Listen,
  Feed,
  Shop,
  Write,
  Read,
  Plan,
  Welcome,
} from './routing/routeImports';
import { MainHeading } from '@myreactapp/modules/shared/ui';
import { BackdropLoader } from '@myreactapp/modules/shared/ui';

interface GuardedRouteProps {
  /**
   * Permission check for route
   * @default false
   */
  authenticated?: boolean;
  /**
   * Permission check for route
   * @default false
   */
  registered?: boolean;
  /**
   * Route to be redirected to
   * @default '/'
   */
  redirectRoute?: string;
}

const {
  authLogin: { authenticated, registered },
} = { authLogin: { authenticated: false, registered: false } };

const routes = [
  { path: '/welcome', component: Welcome, subscribed: false },
  { path: '/login', component: Login, subscribed: false },
  {
    path: '/register',
    component: Register,
    subscribed: false,
    registered: false,
  },
  {
    path: '/payment',
    component: Payment,
    subscribed: false,
    registered: true,
  },
  { path: '/watch', component: Watch, subscribed: true },
  { path: '/listen', component: Listen, subscribed: true },
  { path: '/feed', component: Feed, subscribed: true },
  { path: '/shop', component: Shop, subscribed: true },
  { path: '/write', component: Write, subscribed: true },
  { path: '/read', component: Read, subscribed: true },
  { path: '/plan', component: Plan, subscribed: true },
];

export const GuardedRoute = ({
  authenticated = false,
  registered = false,
  redirectRoute = '/',
}: GuardedRouteProps) =>
  authenticated ? (
    <Outlet />
  ) : registered ? (
    <Navigate to="/payment" replace />
  ) : (
    <Navigate to="/login" replace />
  );

export const AppRoutess = (
  authState = { subscribed: false, registered: false }
) => {
  const { subscribed, registered } = authState;
  <Routes>
    <Route path="/" element={subscribed ? <Dashboard /> : <Landing />}>
      {routes.map((route) => (
        <GuardedRoute
          authenticated={subscribed}
          registered={registered}
        ></GuardedRoute>
      ))}
    </Route>
  </Routes>;
};

export const CustomRoutes = () => {
  return (
    <Routes>
      {authenticated === true ? (
        <Route
          path="/"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <Dashboard />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Welcome />
              </Suspense>
            }
          ></Route>
          <Route
            path="/listen"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Listen />
              </Suspense>
            }
          />
          <Route
            path="/watch"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Watch />
              </Suspense>
            }
          />
          <Route
            path="/plan"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Plan />
              </Suspense>
            }
          />
          <Route
            path="/read"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Read />
              </Suspense>
            }
          />
          <Route
            path="/write"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Write />
              </Suspense>
            }
          />
          <Route
            path="/shop"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/feed"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Feed />
              </Suspense>
            }
          />
        </Route>
      ) : (
        <Route
          path="/"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <Landing />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <MainHeading />
              </Suspense>
            }
          ></Route>
          <Route
            path="/welcome"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Welcome />
              </Suspense>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Login />
              </Suspense>
            }
          ></Route>
          <Route
            path="register"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Register />
              </Suspense>
            }
          ></Route>
          <Route
            path="payment"
            element={
              <Suspense fallback={<BackdropLoader />}>
                <Payment />
              </Suspense>
            }
          ></Route>
        </Route>
      )}
      <Route
        path="*"
        element={
          <Suspense fallback={<BackdropLoader />}>
            <PageNotFound />
          </Suspense>
        }
      />
    </Routes>
  );
};
