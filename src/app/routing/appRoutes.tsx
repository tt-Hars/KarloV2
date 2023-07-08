import { Route, Routes } from 'react-router-dom';
import {
  RouteWithChildrenInterface,
  privateRoutesList,
  publicRoutesList,
} from './routesConfig';
import { Dashboard, Landing } from './routeImports';
import { Suspense } from 'react';
import { BackdropLoader } from '@myreactapp/modules/shared/ui';
import GuardedRoutePublic from './guards/publicRouteGuard';
import GuardedRoutePrivate from './guards/privateRouteGuard';

export const renderRouteWithChildren = (
  routes: RouteWithChildrenInterface[]
) => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <Suspense fallback={<BackdropLoader />}>{route.element}</Suspense>
      }
    >
      {/* {route.children && renderRouteWithChildren(route.children)} */}
    </Route>
  ));
};

export const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const isRegistered = localStorage.getItem('registered') === 'true';
  console.log(isAuthenticated, isRegistered)
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Suspense fallback={<BackdropLoader />}>
              <Dashboard />
            </Suspense>
          ) : (
            <Suspense fallback={<BackdropLoader />}>
              <Landing />
            </Suspense>
          )
        }
      >
        <Route
          element={
            <GuardedRoutePrivate authenticated={isAuthenticated} redirectRoute="/login" />
          }
        >
          {renderRouteWithChildren(privateRoutesList)}
        </Route>
        <Route
          element={
            <GuardedRoutePublic authenticated={isAuthenticated} registered={isRegistered} />
          }
        >
          {renderRouteWithChildren(publicRoutesList)}
        </Route>
        
      </Route>
    </Routes>
  );
};
