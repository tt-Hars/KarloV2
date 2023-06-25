import { Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
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
} from './routeImports';

const {
  authLogin: { authenticated, registered },
} = { authLogin: { authenticated: false, registered: false } };

export const CustomRoutes = () => {
  return (
    <Routes>
      {authenticated === false ? (
        <Route path="/" element={<Dashboard />}>
          <Route path="/listen" element={<Suspense><Listen /></Suspense>} />
          <Route path="/watch" element={<Suspense><Watch /></Suspense>} />
          <Route path="/plan" element={<Suspense><Plan /></Suspense>} />
          <Route path="/read" element={<Suspense><Read /></Suspense>} />
          <Route path="/write" element={<Suspense><Write /></Suspense>} />
          <Route path="/shop" element={<Suspense><Shop /></Suspense>} />
          <Route path="/feed" element={<Suspense><Feed /></Suspense>} />
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
            path="/login"
            element={
              <Suspense>
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
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
