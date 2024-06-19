import React, { useEffect } from 'react';

import classNames from 'classnames';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { isEmpty } from 'lodash';
import { useLazyGetConversationsQuery } from '../query';
import {
	selectConversationId,
	setConversations,
} from '../state/conversation.slice';
import { toast } from 'react-toastify';
import { IconContext } from 'react-icons';
import { BsThreeDots } from 'react-icons/bs';

const ConversationList: React.FC = () => {
	const { conversations, selectedConversationId } = useAppSelector(
		(state) => state.conversation,
	);

	const dispatch = useAppDispatch();

	const [getConversations, { data, error, isError, isSuccess }] =
		useLazyGetConversationsQuery();

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error(
				(error as Error)?.message ||
					'There was an error during fetching conversations. Please try again.',
			);
		}
		if (isSuccess) {
			if (data) dispatch(setConversations(data.data.conversations));
		}
	}, [isError, isSuccess, error, dispatch, data]);

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error((error as Error)?.message || 'Please try again.');
		}
	}, [isError, error, dispatch]);

	useEffect(() => {
		getConversations();
	}, []);

	return (
		<motion.div
			key="conversation-list"
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			transition={{ duration: 0.25 }}
			className="flex h-full w-full grow flex-col items-start justify-start pb-2"
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
						<motion.div
							key={conversation.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.5 }}
						>
							<button
								className={classNames(
									'font-base flex w-full items-center gap-4 rounded-lg px-5 py-2 font-semibold text-white--1/75 transition-colors hover:bg-gradient-to-l hover:from-[#323337] hover:to-[rgba(80,62,110,0.29)] hover:text-white',
									selectedConversationId === conversation.id
										? 'bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)] text-white'
										: '',
								)}
								onClick={() =>
									dispatch(selectConversationId({ id: conversation.id }))
								}
							>
								<div className="grow overflow-hidden truncate text-left">
									{conversation.title}
								</div>
								<div className="flex items-center">
									<div className="relative z-10">
										<button className="group relative h-8 w-8">
											<IconContext.Provider
												value={{
													className:
														'transition-colors fill-grey group-hover:fill-white',
													style: {
														verticalAlign: 'middle',
														width: '1.125rem',
														height: '1.125rem',
													},
												}}
											>
												<BsThreeDots />
											</IconContext.Provider>
										</button>
									</div>
								</div>
							</button>
						</motion.div>
					))
				)}
			</div>
		</motion.div>
	);
};

export default ConversationList;
