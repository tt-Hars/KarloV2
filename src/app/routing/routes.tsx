import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
} from './routeImports';
import { MainHeading } from '@myreactapp/modules/shared/ui';
import { BackdropLoader } from '@myreactapp/modules/shared/ui';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';

export const PrivateRoute = (props: { children: EmotionJSX.Element }) => {
  const { children } = props;
  const isAuthenticated = useLocalStorageManager('authenticated');
  const isSubscribed = useLocalStorageManager('subscribed');

  return isAuthenticated.value && isSubscribed.value === true ? (
    children
  ) : (
    <Navigate to="/hello" replace />
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
        <Route
          path="payment"
          element={
            <Suspense fallback={<BackdropLoader />}>
              <Payment />
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
