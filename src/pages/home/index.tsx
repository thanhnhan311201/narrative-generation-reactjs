import React from 'react';

import SideMenu from './components/SideMenu';
import SigninDialog from '@/modules/auth/views/SigninDialog';
import CreateConversationDialog from '@/modules/conversation/views/CreateConversationDialog';

const HomePage: React.FC = () => {
	return (
		<>
			<main className="h-screen w-screen bg-main-bg pl-80 pr-6">
				<SideMenu key="side-menu" />
				<div className="flex h-screen py-6">
					<div className="relative max-w-full grow rounded-[1.25rem] bg-content-bg">
						<div className="flex h-full w-full flex-col items-center justify-center">
							<div className="h-12 w-12">
								<img
									src="/images/logo.svg"
									alt="logo"
									decoding="async"
									loading="lazy"
									className="w-full rounded-xl"
									width={48}
									height={48}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<SigninDialog key="login-dialog" />
			<CreateConversationDialog key="create-conversation-dialog" />
		</>
	);
};

export default HomePage;
