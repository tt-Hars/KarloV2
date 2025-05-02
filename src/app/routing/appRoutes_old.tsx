import { Route, Routes, redirect } from 'react-router-dom';
import {
  RouteWithChildrenInterface,
  privateRoutesList,
  publicRoutesList,
} from './routesConfig';
import { Dashboard, Landing, PageNotFound } from './routeImports';
import { Suspense } from 'react';
import { BackdropLoader } from '@karlo/modules/shared/ui';
import GuardedRoutePublic from './guards/publicRouteGuard';
import GuardedRoutePrivate from './guards/privateRouteGuard';
import { useLocalStorageManager } from '@karlo/modules-shared-hooks';

const loaderFnPr = (
  route: RouteWithChildrenInterface,
  auth = false,
  subscribed = false
) => {
  if (auth === true && subscribed === true)
    throw redirect(route.redirect ?? route.path);
  return undefined;
};

const loaderFnPb = (
  route: RouteWithChildrenInterface,
  auth = false,
  subscribed = false
) => {
  if (auth === false && subscribed === false)
    throw redirect(route.redirect ?? route.path);
  return undefined;
};

export const renderRouteWithChildrenPb = (
  routes: RouteWithChildrenInterface[],
  auth = false,
  subscribed = false
) => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <Suspense fallback={<BackdropLoader />}>{route.element}</Suspense>
      }
      loader={async () => {
        if (
          auth === false &&
          subscribed === false
        )
          throw redirect(route.redirect ?? route.path);
        return null;
      }}
    >
    </Route>
  ));
};

export const renderRouteWithChildrenPr = (
  routes: RouteWithChildrenInterface[],
  auth = false,
  subscribed = false
) => {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      element={
        <Suspense fallback={<BackdropLoader />}>{route.element}</Suspense>
      }
      loader={async () => {
        if (
          auth === true &&
          subscribed === false
        )
          throw redirect(route.redirect ?? route.path);
        return null;
      }}
    >
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
          {renderRouteWithChildrenPr(
            privateRoutesList,
            isAuthenticated.value,
            isSubscribed.value
          )}
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
          {renderRouteWithChildrenPb(
            publicRoutesList,
            isAuthenticated.value,
            isSubscribed.value
          )}
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
