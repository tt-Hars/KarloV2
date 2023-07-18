import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import {
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
} from './routeImports';

interface RouteInterface {
  element: EmotionJSX.Element;
  path: string;
  label?: string;
}

export interface RouteWithChildrenInterface extends RouteInterface {
  children?: RouteWithChildrenInterface[];
  redirect?: string,
  authRequired?: boolean,
  subscriptionRequired?: boolean
}

export const publicRoutesList: RouteWithChildrenInterface[] = [
  {
    element: <MainHeading />,
    path: '/',
    authRequired: false,
    subscriptionRequired: false
  },
  {
    element: <Welcome />,
    path: '/welcome',
    authRequired: false,
    subscriptionRequired: false
  },
  {
    element: <Login />,
    path: '/login',
    authRequired: false,
    subscriptionRequired: false,
    redirect: '/',
  },
  {
    element: <Register />,
    path: '/register',
    authRequired: false,
    subscriptionRequired: false,
    redirect: '/',
  }
];

export const privateRoutesList: RouteWithChildrenInterface[] = [
  {
    element: <Welcome />,
    path: '/home',
    authRequired: true,
    subscriptionRequired: true,
    redirect: '/login',
  },
  {
    element: <Payment />,
    path: '/payment',
    authRequired: true,
    subscriptionRequired: false,
    redirect: '/login',
  },
  {
    element: <Read />,
    path: '/read',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Write />,
    path: '/write',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Plan />,
    path: '/plan',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Listen />,
    path: '/listen',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Watch />,
    path: '/watch',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Feed />,
    path: '/feed',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
  {
    element: <Shop />,
    path: '/shop',
    redirect: '/login',
    authRequired: true,
    subscriptionRequired: true
  },
];
