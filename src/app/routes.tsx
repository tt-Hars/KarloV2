import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
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

const {
  authLogin: { authenticated, registered },
} = { authLogin: { authenticated: false, registered: false } };

export const CustomRoutes = () => {
  return (
    <Routes>
      {authenticated === true ? (
        <Route
          path="/"
          element={
            <Suspense>
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
              <Suspense>
                <Listen />
              </Suspense>
            }
          />
          <Route
            path="/watch"
            element={
              <Suspense>
                <Watch />
              </Suspense>
            }
          />
          <Route
            path="/plan"
            element={
              <Suspense>
                <Plan />
              </Suspense>
            }
          />
          <Route
            path="/read"
            element={
              <Suspense>
                <Read />
              </Suspense>
            }
          />
          <Route
            path="/write"
            element={
              <Suspense>
                <Write />
              </Suspense>
            }
          />
          <Route
            path="/shop"
            element={
              <Suspense>
                <Shop />
              </Suspense>
            }
          />
          <Route
            path="/feed"
            element={
              <Suspense>
                <Feed />
              </Suspense>
            }
          />
        </Route>
      ) : (
        <Route
          path="/"
          element={
            <Suspense>
              <Landing />
            </Suspense>
          }
        >
          <Route
            path="/"
            element={
              <Suspense>
                <MainHeading />
              </Suspense>
            }
          ></Route>
          <Route
            path="/welcome"
            element={
              <Suspense>
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
              <Suspense>
                <Register />
              </Suspense>
            }
          ></Route>
          <Route
            path="payment"
            element={
              <Suspense>
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
