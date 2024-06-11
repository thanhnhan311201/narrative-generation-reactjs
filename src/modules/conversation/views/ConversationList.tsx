import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { isEmpty } from 'lodash';
import { AUTHENTICATION_STATUS } from '@/modules/auth/utils';
import { useLazyGetConversationsQuery } from '../query';
import { setConversations } from '../state/conversation.slice';
import { toast } from 'react-toastify';

const ConversationList: React.FC = () => {
	const [selectedConversationId, setSelectedConversationId] =
		useState<string>();

	const { authStatus } = useAppSelector((state) => state.auth);
	const { conversations } = useAppSelector((state) => state.conversation);

	const [getConversations, { data, error, isError }] =
		useLazyGetConversationsQuery(undefined);

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!data) {
			return;
		}

		dispatch(setConversations(data.data.conversations));
	}, [data]);

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error((error as Error)?.message || 'Please try again.');
		}
	}, [isError, error, dispatch]);

	useEffect(() => {
		if (authStatus === AUTHENTICATION_STATUS.AUTHENTICATED) {
			getConversations();
		}
	}, [authStatus]);

	return (
		<AnimatePresence>
			{authStatus === AUTHENTICATION_STATUS.AUTHENTICATED ? (
				<motion.div
					key="conversation-list"
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -50 }}
					transition={{ duration: 0.25 }}
					className="flex w-full grow flex-col items-start justify-start overflow-hidden pb-2"
				>
					<div className="font-base w-full shrink-0 px-5 py-4 text-left text-grey/75">
						Conversations
					</div>
					<div className="conversation-list flex w-full grow flex-col justify-start gap-2 overflow-y-auto scroll-smooth">
						{isEmpty(conversations) ? (
							<span className='font-["Inter"] text-xs text-white'>
								There is no conversation, create a new one
							</span>
						) : (
							conversations.map((conversation) => (
								<motion.button
									key={conversation.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}
									className={classNames(
										'font-base flex w-full items-center gap-4 rounded-lg px-5 py-2 font-semibold text-white--1/75 transition-colors hover:bg-gradient-to-l hover:from-[#323337] hover:to-[rgba(80,62,110,0.29)] hover:text-white',
										selectedConversationId === conversation.id
											? 'bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)] text-white'
											: '',
									)}
									onClick={() => setSelectedConversationId(conversation.id)}
								>
									<div className="grow overflow-hidden truncate text-left">
										{conversation.title}
									</div>
								</motion.button>
							))
						)}
					</div>
				</motion.div>
			) : (
				<div></div>
			)}
		</AnimatePresence>
	);
};

export default ConversationList;
