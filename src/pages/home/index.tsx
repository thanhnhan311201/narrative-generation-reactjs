import React from 'react';

import SideMenu from './components/SideMenu';
import CreateConversationDialog from '@/modules/conversation/views/CreateConversationDialog';
import ConversationContent from '@/modules/conversation/views/ConversationContent';

const HomePage: React.FC = () => {
	return (
		<>
			<main className="h-screen w-screen bg-main-bg pl-80 pr-6">
				<SideMenu key="side-menu" />
				<div className="flex h-screen py-6">
					<div className="relative max-w-full grow rounded-[1.25rem] bg-content-bg">
						<ConversationContent />
					</div>
				</div>
			</main>
			<CreateConversationDialog key="create-conversation-dialog" />
		</>
	);
};

export default HomePage;
