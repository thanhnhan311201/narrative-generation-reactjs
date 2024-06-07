import React from 'react';

import SigninDialog from '@/modules/auth/views/SigninDialog';
import SideMenu from './components/SideMenu';

const HomePage: React.FC = () => {
	return (
		<>
			<main className="h-screen w-screen bg-main-bg pl-80 pr-6">
				<SideMenu key="side-menu" />
				<div className="flex h-screen py-6">
					<div className="relative flex max-w-full grow rounded-[1.25rem] bg-content-bg">
						<div className="relative flex max-w-full grow flex-col"></div>
					</div>
				</div>
			</main>
			<SigninDialog key="login-dialog" />
		</>
	);
};

export default HomePage;
