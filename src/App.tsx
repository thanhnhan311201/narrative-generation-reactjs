import React, { useEffect } from 'react';

import AppRoutes from './pages/routes';

import useAutoSignin from './modules/auth/hooks/useAutoSignin.hook';

function App() {
	const autoSignin = useAutoSignin();

	useEffect(() => {
		autoSignin();
	}, []);

	return <AppRoutes />;
}

export default App;
