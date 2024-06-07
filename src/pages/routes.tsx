import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { homeRoutes } from './home/route';

import AppContainer from '@/components/AppContainer';

const AppRoutes: React.FC = () => {
	const routes = [...homeRoutes];

	return (
		<AppContainer>
			<Routes>
				{Array.isArray(routes) &&
					routes.map((route) => (
						<Route key={route.path} path={route.path} element={route.element} />
					))}
				<Route path="*" element={<Navigate to={'/'} />} />
			</Routes>
		</AppContainer>
	);
};

export default AppRoutes;
