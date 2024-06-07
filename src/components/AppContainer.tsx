import React from 'react';
import { Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AppContainer: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	return (
		<Suspense
			fallback={
				<div className="flex h-[100vh] flex-auto flex-col">
					<div>Loading...</div>
				</div>
			}
		>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				pauseOnHover
				theme="light"
			/>
			<>{children}</>
		</Suspense>
	);
};

export default AppContainer;
