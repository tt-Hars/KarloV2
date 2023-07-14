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
}

export const publicRoutesList: RouteWithChildrenInterface[] = [
  {
    element: <MainHeading />,
    path: '/',
  },
  {
    element: <Welcome />,
    path: '/welcome',
  },
  {
    element: <Login />,
    path: '/login',
  },
  {
    element: <Register />,
    path: '/register',
  },
  {
    element: <Payment />,
    path: '/payment',
  },
];

export const privateRoutesList: RouteWithChildrenInterface[] = [
  {
    element: <Welcome />,
    path: '/home',
  },
  {
    element: <Read />,
    path: '/read',
  },
  {
    element: <Write />,
    path: '/write',
  },
  {
    element: <Plan />,
    path: '/plan',
  },
  {
    element: <Listen />,
    path: '/listen',
  },
  {
    element: <Watch />,
    path: '/watch',
  },
  {
    element: <Feed />,
    path: '/feed',
  },
  {
    element: <Shop />,
    path: '/shop',
  },
];
