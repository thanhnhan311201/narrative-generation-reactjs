import React from 'react';

import { FaRegPenToSquare } from 'react-icons/fa6';
import { IconContext } from 'react-icons';

import UserProfile from '@/modules/user/views/UserProfile';
import ConversationList from '@/modules/conversation/views/ConversationList';
import SigninContainer from '@/modules/auth/views/SigninContainer';

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
				<button className="group">
					<IconContext.Provider
						value={{
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
							},
						}}
					>
						<FaRegPenToSquare className="fill-grey transition-colors group-hover:fill-white--1" />
					</IconContext.Provider>
				</button>
			</div>
			<div className="w-full grow overflow-hidden">
				<ConversationList />
			</div>
			<UserProfile key="user-profile" />
			<SigninContainer key="signin-container" />
		</div>
	);
};

export default SideMenu;
