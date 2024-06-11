import React from 'react';

import UserProfile from '@/modules/user/views/UserProfile';
import ConversationList from '@/modules/conversation/views/ConversationList';
import SigninContainer from '@/modules/auth/views/SigninContainer';
import CreateConversationButton from '@/modules/conversation/components/CreateConversationButton';

const SideMenu: React.FC = () => {
	return (
		<div className="fixed bottom-0 left-0 top-0 flex w-80 flex-col bg-main-bg px-4 pb-[10.5rem] pt-[5rem]">
			<div className="absolute left-0 right-0 top-0 flex h-[5rem] items-center justify-between pl-7 pr-6">
				<a className="flex items-center justify-center gap-2" href="/">
					<img
						src="/images/logo.svg"
						alt="logo"
						decoding="async"
						loading="lazy"
						className="w-full rounded-xl"
						width={48}
						height={48}
					/>
					<span className="font-['Nunito'] text-[1.75rem] font-bold leading-9 text-white">
						StoryMe
					</span>
				</a>
				<CreateConversationButton key="create-conversation" />
			</div>
			<div className="w-full grow overflow-hidden">
				<ConversationList key="conversations" />
			</div>
			<UserProfile key="user-profile" />
			<SigninContainer key="signin-container" />
		</div>
	);
};

export default SideMenu;
