import React, { useState } from 'react';

import classNames from 'classnames';
import { useAppSelector } from '@/store';
import { isEmpty } from 'lodash';

const ConversationList = () => {
	const [selectedConversationId, setSelectedConversationId] =
		useState<string>();

	const { conversations } = useAppSelector((state) => state.conversation);

	return (
		<div className="flex w-full grow flex-col items-start justify-start overflow-hidden pb-2">
			<div className="font-base w-full shrink-0 px-5 py-4 text-left text-grey/75">
				Conversation list
			</div>
			<div className="conversation-list flex w-full grow flex-col justify-start gap-2 overflow-y-auto scroll-smooth">
				{isEmpty(conversations) ? (
					<span className='font-["Inter"] text-xs text-white'>
						There is no conversation, create a new one
					</span>
				) : (
					conversations.map((conversation) => (
						<button
							key={conversation.id}
							className={classNames(
								'font-base flex w-full items-center gap-4 rounded-lg px-5 py-2 font-semibold text-white--1/75 transition-colors hover:text-white',
								selectedConversationId === conversation.id
									? 'bg-gradient-to-l from-[#323337] to-[rgba(80,62,110,0.29)] text-white'
									: '',
							)}
							onClick={() => setSelectedConversationId(conversation.id)}
						>
							<div className="grow overflow-hidden truncate text-left">
								{conversation.title}
							</div>
						</button>
					))
				)}
			</div>
		</div>
	);
};

export default ConversationList;
