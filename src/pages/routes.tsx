import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { homeRoutes } from './home/route';

import AppContainer from '@/components/AppContainer';

const SigninDialog = React.lazy(
	() => import('@/modules/auth/views/SigninDialog'),
);

const AppRoutes: React.FC = () => {
	const location = useLocation();
	const state = location.state as {
		backgroundLocation?: { pathname: string; search: string; hash: string };
	};

	const routes = [...homeRoutes];

	return (
		<AppContainer>
			<Routes location={state?.backgroundLocation || location}>
				{Array.isArray(routes) &&
					routes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
			{state?.backgroundLocation && (
				<Routes>
					<Route path="/signin" element={<SigninDialog />} />
				</Routes>
			)}
		</AppContainer>
	);
};

export default AppRoutes;
