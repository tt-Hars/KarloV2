import { Route, Routes } from 'react-router-dom';
import {
  RouteWithChildrenInterface,
  privateRoutesList,
  publicRoutesList,
} from './routesConfig';
import { Dashboard, Landing, PageNotFound } from './routeImports';
import { Suspense } from 'react';
import { BackdropLoader } from '@myreactapp/modules/shared/ui';
import GuardedRoutePublic from './guards/publicRouteGuard';
import GuardedRoutePrivate from './guards/privateRouteGuard';
import { useLocalStorageManager } from '@myreactapp/modules/shared/hooks';

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
  const isAuthenticated = useLocalStorageManager('authenticated');
  const isRegistered = useLocalStorageManager('registered');
  const isSubscribed = useLocalStorageManager('subscribed');
  console.log(
    'these are the states:::',
    isAuthenticated,
    isRegistered,
    isSubscribed
  );
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated.value && isSubscribed.value ? (
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
            <GuardedRoutePrivate
              authenticated={isAuthenticated.value}
              registered={isRegistered.value}
              subscribed={isSubscribed.value}
              redirectRoute="/login"
            />
          }
        >
          {renderRouteWithChildren(privateRoutesList)}
        </Route>
        <Route
          element={
            <GuardedRoutePublic
              authenticated={isAuthenticated.value}
              registered={isRegistered.value}
              subscribed={isSubscribed.value}
            />
          }
        >
          {renderRouteWithChildren(publicRoutesList)}
        </Route>
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
