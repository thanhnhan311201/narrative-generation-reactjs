import React, { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('.'));

export const homeRoutes: RouteObject[] = [{ path: '/', element: <HomePage /> }];
