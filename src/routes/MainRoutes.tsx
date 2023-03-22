import { lazy, Suspense } from 'react';
import type { RouteObject } from 'react-router';

// project import
import MinimalLayout from '../layout/MinimalLayout';

// render - dashboard
const DashboardDefault = lazy(() => import('../pages/dashboard'));
const StarShipsPage = lazy(() => import('../pages/starships'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: (
    <Suspense>
      <MinimalLayout />
    </Suspense>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'starships',
      element: <StarShipsPage />,
    },
    {
      path: '*',
      element: <h1>404 - Page not found! </h1>,
    },
  ],
};

export default MainRoutes;
