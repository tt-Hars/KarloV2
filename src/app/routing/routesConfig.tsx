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
  Dashboard,
} from './routeImports';

interface RouteInterface {
  element: EmotionJSX.Element;
  path: string;
  label?: string;
}

export interface RouteWithChildrenInterface extends RouteInterface {
  children?: RouteWithChildrenInterface[];
}

// export const publicRoutes: RouteWithChildrenInterface[] = [
//   {
//     element: (
//       <PublicRouteGuard>
//         <Welcome />
//       </PublicRouteGuard>
//     ),
//     path: '/welcome',
//   },
//   {
//     element: (
//       <PublicRouteGuard>
//         <Login />
//       </PublicRouteGuard>
//     ),
//     path: '/login',
//   },
//   {
//     element: (
//       <PublicRouteGuard>
//         <Register />
//       </PublicRouteGuard>
//     ),
//     path: '/register',
//   },
//   {
//     element: (
//       <PublicRouteGuard>
//         <Payment />
//       </PublicRouteGuard>
//     ),
//     path: '/payment',
//   },
// ];

// export const privateRoutes: RouteWithChildrenInterface[] = [
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Read />
//       </GuardedRoutePrivate>
//     ),
//     path: '/read',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Write />
//       </GuardedRoutePrivate>
//     ),
//     path: '/write',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Plan />
//       </GuardedRoutePrivate>
//     ),
//     path: '/plan',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Listen />
//       </GuardedRoutePrivate>
//     ),
//     path: '/listen',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Watch />
//       </GuardedRoutePrivate>
//     ),
//     path: '/watch',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Feed />
//       </GuardedRoutePrivate>
//     ),
//     path: '/feed',
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Shop />
//       </GuardedRoutePrivate>
//     ),
//     path: '/shop',
//   },
// ];
// export const allRoutes: RouteWithChildrenInterface[] = [
//   {
//     element: (
//       <PublicRouteGuard>
//         <Landing />
//       </PublicRouteGuard>
//     ),
//     path: '/',
//     children: publicRoutes,
//   },
//   {
//     element: (
//       <GuardedRoutePrivate>
//         <Dashboard />
//       </GuardedRoutePrivate>
//     ),
//     path: '/',
//     children: privateRoutes,
//   },
//   {
//     element: <PageNotFound />,
//     path: '*',
//   },
// ];

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
    element: <Dashboard />,
    path: '/dashboard',
  },
  {
    element: <Welcome />,
    path: 'welcome',
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
