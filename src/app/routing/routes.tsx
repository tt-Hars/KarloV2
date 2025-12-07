import { Suspense } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
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
  MainHeading,
  Profile
} from './routeImports';
import { BackdropLoader } from '../components/backdrop-loader/backdrop-loader';
import { useAuth } from '@karlo/modules-shared-hooks';

const PrivateRoute = ({ children }: { children: EmotionJSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <BackdropLoader />;
  return isAuthenticated ? (
    children
  ) : location.pathname === '/' ? (
    <Navigate to="/hello" replace />
  ) : (
    <Navigate to="/login" replace state={location.pathname} />
  );
};

const SubscribedRoute = ({ children }: { children: EmotionJSX.Element }) => {
  const { isAuthenticated, isSubscribed, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <BackdropLoader />;
  return isAuthenticated && isSubscribed ? (
    children
  ) : (
    <Navigate to="/payment" replace state={location.pathname} />
  );
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<BackdropLoader />}>
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<BackdropLoader />}>
              <Welcome />
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
        <Route
          path="/listen"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Listen />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/watch"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Watch />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/plan"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Plan />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/read"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Read />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/write"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Write />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/shop"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Shop />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/feed"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Feed />
              </SubscribedRoute>
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <SubscribedRoute>
                <Profile />
              </SubscribedRoute>
            </Suspense>
          }
        />
      </Route>
      <Route
        element={
          <Suspense fallback={<BackdropLoader />}>
            <Landing />
          </Suspense>
        }
      >
        <Route
          path="/hello"
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
      </Route>
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
