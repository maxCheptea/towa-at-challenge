import { lazy } from 'react';
import type { RouteObject } from 'react-router';

// project import
import MinimalLayout from '../layout/MinimalLayout';

// render - dashboard
const DashboardDefault = lazy(() => import('../pages/dashboard'));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes: RouteObject = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />,
    },
    {
      path: 'starwars',
      element: <h1>Test </h1>,
    },
  ],
};

export default MainRoutes;
