import { lazy } from 'react';

//Pre Login
export const Landing = lazy(() => import('./landing/landing'));
export const Login = lazy(() => import('modules/login/src/lib/login/login'));
export const Register = lazy(
  () => import('modules/login/src/lib/register/register')
);
export const Payment = lazy(
  () => import('modules/login/src/lib/payment/payment')
);

//Post Login
export const Dashboard = lazy(() => import('./dashboard/dashboard'));
export const Watch = lazy(() => import('modules/watch/src/lib/watch/watch'));
export const Listen = lazy(
  () => import('modules/listen/src/lib/listen/listen')
);
export const Feed = lazy(() => import('modules/feed/src/lib/feed/feed'));
export const Shop = lazy(() => import('modules/shop/src/lib/shop/shop'));
export const Write = lazy(() => import('modules/editor/src/lib/write/write'));
export const Read = lazy(() => import('modules/reader/src/lib/read/read'));
export const Plan = lazy(() => import('modules/planner/src/lib/plan/plan'));

//Wildcard
export const PageNotFound = lazy(
  () => import('./page-not-found/page-not-found')
);