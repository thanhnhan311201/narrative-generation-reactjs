import React from 'react';

import { motion } from 'framer-motion';

import { IconContext } from 'react-icons';
import { BsCircleFill } from 'react-icons/bs';
import { IoIosLogOut } from 'react-icons/io';

import { removeUser } from '../state/user.slice';
import { useAppDispatch, useAppSelector } from '@/store';
import { WebSocketClient } from '@/network/websocket';

import { AuthService } from '@/modules/auth/services';
import { setUnauthenticated } from '@/modules/auth/state/auth.slice';
import { removeCredentialToken } from '@/modules/auth/helpers';
import {
	resetConversations,
	resetDisplayContents,
	selectConversationId,
} from '@/modules/conversation/state/conversation.slice';

const UserProfile: React.FC = () => {
	const { userInfo } = useAppSelector((state) => state.user);

	const dispatch = useAppDispatch();

	const handleSignout = async () => {
		await AuthService.getInstance().signout();
		removeCredentialToken();
		dispatch(setUnauthenticated());
		dispatch(removeUser());
		dispatch(resetConversations());
		dispatch(resetDisplayContents());
		dispatch(selectConversationId({ id: null }));
		WebSocketClient.getInstance().disconnect();
	};

	return (
		<motion.div
			key="user-profile"
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 50 }}
			transition={{ duration: 0.25 }}
			className="absolute bottom-0 left-0 right-0 flex flex-col items-start gap-3 bg-main-bg px-4 pb-6 before:pointer-events-none before:absolute before:bottom-full before:left-0 before:right-0 before:h-10 before:bg-gradient-to-t before:from-[#131617] before:to-[rgba(19,22,23,0)]"
		>
			<div className="w-full shadow-[0_1.25rem_1.5rem_0_rgba(0,0,0,0.5)]">
				<div className="w-full rounded-xl bg-secondary-color p-[1.25rem]">
					<div className="flex items-center gap-4">
						<div className="relative h-10 shrink-0 basis-10">
							<img
								className="w-full rounded-full"
								src={userInfo?.profilePhoto}
								alt="User avatar"
								referrerPolicy="no-referrer"
								crossOrigin="anonymous"
							/>
							<IconContext.Provider
								value={{
									style: {
										position: 'absolute',
										width: '1.125rem',
										height: '1.125rem',
										color: '#46ab5e',
										bottom: -2,
										right: -2,
										border: '4px solid #232627',
										borderRadius: '50%',
									},
								}}
							>
								<BsCircleFill />
							</IconContext.Provider>
						</div>
						<div className="font-base flex grow flex-col items-start justify-center gap-[.375rem] overflow-hidden font-semibold">
							<div className="w-full truncate text-sm text-white">
								{userInfo?.username}
							</div>
							<div className="w-full truncate text-xs text-white--1">
								{userInfo?.email}
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				className="font-base group relative flex h-10 w-full items-center justify-center rounded-xl border-[0.0625rem] border-transparent bg-secondary-color font-semibold text-grey hover:border-border-color hover:bg-main-bg hover:text-white"
				onClick={() => handleSignout()}
			>
				<div className="flex items-center gap-3">
					<IconContext.Provider
						value={{
							className: 'fill-grey group-hover:fill-white transition-colors',
							style: {
								verticalAlign: 'middle',
								width: '1.5rem',
								height: '1.5rem',
							},
						}}
					>
						<IoIosLogOut />
					</IconContext.Provider>
					<span className="transition-colors">Signout</span>
				</div>
			</button>
		</motion.div>
	);
};

export default UserProfile;
