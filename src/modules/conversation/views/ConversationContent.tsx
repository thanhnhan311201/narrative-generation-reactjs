import React, { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

import { IconContext } from 'react-icons';
import { BsThreeDots } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@/store';
import { useLazyGetConversationContentQuery } from '../query';

import { LuPencil } from 'react-icons/lu';
import { MdDelete } from 'react-icons/md';

import PromptInput from '../components/PromptInput';
import Prompt from '../components/Prompt';
import Answer from '../components/Answer';
import ConversationSkeleton from '@/modules/conversation/components/ConversationSkeleton';
import TitleSkeleton from '../components/TitleSkeleton';

import { AUTHENTICATION_STATUS } from '@/modules/auth/utils';
import { isEmpty } from 'lodash';
import { toast } from 'react-toastify';
import { DisplayContent } from '../@types';
import {
	resetConversations,
	setDisplayContents,
} from '../state/conversation.slice';
import AnswerLoading from '../components/AnswerLoading';

const ConversationContent: React.FC = () => {
	const lastChatRef = useRef<HTMLDivElement>(null);

	const { selectedConversationId } = useAppSelector(
		(state) => state.conversation,
	);
	const { authStatus } = useAppSelector((state) => state.auth);
	const { userInfo } = useAppSelector((state) => state.user);
	const { displayContents, isWaitingForAnswer } = useAppSelector(
		(state) => state.conversation,
	);

	const dispatch = useAppDispatch();

	const [
		getConversationContent,
		{ data, error, isError, isLoading, isSuccess, isFetching },
	] = useLazyGetConversationContentQuery();

	useEffect(() => {
		if (
			authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED ||
			selectedConversationId === null
		) {
			return;
		}

		getConversationContent({ id: selectedConversationId });
	}, [selectedConversationId, authStatus]);

	useEffect(() => {
		if (!isEmpty(error) || isError) {
			toast.error(
				(error as Error)?.message ||
					'There was an error during fetching conversation content. Please try again.',
			);

			dispatch(resetConversations());
		}
		if (isSuccess) {
			if (!isEmpty(data)) {
				const entireConversation: DisplayContent[] = [];

				data.data.conversationContent.prompts.forEach((prompt) => {
					entireConversation.push({
						id: prompt.id,
						attachment: prompt.attachment,
						content: prompt.content,
						createAt: prompt.createAt,
						type: 'prompt',
					});
				});

				data.data.conversationContent.answers.forEach((answer) => {
					entireConversation.push({
						id: answer.id,
						attachment: null,
						content: answer.content,
						createAt: answer.createAt,
						type: 'answer',
					});
				});

				entireConversation.sort(
					(a, b) =>
						new Date(a.createAt).getTime() - new Date(b.createAt).getTime(),
				);
				dispatch(setDisplayContents(entireConversation));
			}
		}
	}, [isError, isSuccess, error, data]);

	useEffect(() => {
		lastChatRef.current?.scrollIntoView({ behavior: 'instant' });
	}, [displayContents]);

	if (
		authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED ||
		(authStatus === AUTHENTICATION_STATUS.AUTHENTICATED &&
			selectedConversationId === null)
	) {
		return (
			<motion.div
				key="welcome"
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.25 }}
				className="flex h-full w-full items-center justify-center"
			>
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
			</motion.div>
		);
	}

	return (
		<div className="relative h-full w-full">
			<motion.div
				key="conversation-content"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.25 }}
				className="relative flex h-full w-full flex-col justify-start"
			>
				<div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border-color px-10 py-3 shadow-[0_0.75rem_2.5rem_-0.75rem_rgba(0,0,0,0.15)]">
					{isLoading || isFetching ? (
						<TitleSkeleton />
					) : (
						<div className='truncate font-["Inter"] text-xl font-semibold text-white'>
							{data?.data.conversationContent.title}
						</div>
					)}
					<div className="ml-6 flex items-center">
						<div className="relative z-10">
							<button className="group relative h-8 w-8">
								<IconContext.Provider
									value={{
										className:
											'transition-colors fill-grey group-hover:fill-accent-color-2',
										style: {
											verticalAlign: 'middle',
											width: '1.5rem',
											height: '1.5rem',
										},
									}}
								>
									<BsThreeDots />
								</IconContext.Provider>
							</button>
							{/* <div
								className="absolute -right-2 top-full z-20 mt-1 w-[10rem] rounded-[1.25rem] border border-border-color bg-main-bg p-3 shadow-[0_0_1rem_0.25rem_rgba(0,0,0,0.04),0_2rem_2rem_-1rem_rgba(0,0,0,0.1)] outline-none"
								role="menu"
								tabIndex={0}
							>
								<div
									className="flex flex-col justify-start gap-2 space-y-2"
									role="none"
								>
									<button
										className="font-base group flex h-12 w-full items-center gap-3 rounded-lg px-3 font-semibold text-grey transition-colors hover:bg-secondary-color hover:text-white"
										role="menuitem"
										tabIndex={-1}
									>
										<IconContext.Provider
											value={{
												className:
													'transition-colors fill-grey group-hover:fill-white',
												style: {
													verticalAlign: 'middle',
													width: '1.5rem',
													height: '1.5rem',
													fill: 'inherit',
												},
											}}
										>
											<LuPencil />
										</IconContext.Provider>
										<span>Rename</span>
									</button>
									<button
										className="font-base group flex h-12 w-full items-center gap-3 rounded-lg px-3 font-semibold text-accent-color-1 transition-colors hover:bg-secondary-color"
										role="menuitem"
										tabIndex={-1}
									>
										<IconContext.Provider
											value={{
												style: {
													verticalAlign: 'middle',
													width: '1.5rem',
													height: '1.5rem',
													fill: '#d84c10',
												},
											}}
										>
											<MdDelete />
										</IconContext.Provider>
										<span>Delete</span>
									</button>
								</div>
							</div> */}
						</div>
					</div>
				</div>
				<div className="scrollbar-none relative z-[2] mx-auto w-[70.5rem] grow space-y-10 overflow-y-auto scroll-smooth py-10">
					{isLoading || isFetching ? (
						<ConversationSkeleton />
					) : (
						displayContents.map((ctn) =>
							ctn.type === 'prompt' ? (
								<Prompt
									key={ctn.id}
									userProfilePhoto={userInfo?.profilePhoto || ''}
									prompt={{
										content: ctn.content,
										attachment: ctn.attachment,
									}}
								/>
							) : (
								<Answer key={ctn.id} answer={{ content: ctn.content }} />
							),
						)
					)}
					{isWaitingForAnswer && <AnswerLoading />}
					<div ref={lastChatRef} />
				</div>
				<PromptInput selectedConversationId={selectedConversationId} />
			</motion.div>
		</div>
	);
};

export default ConversationContent;
