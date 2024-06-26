import { CommonResponse } from '@/modules/common/@types';
import { Conversation, ConversationContent } from './conversation.type';

export type GetConversationsResponseParams = CommonResponse & {
	data: {
		conversations: Conversation[];
	};
};

export type GetConversationContentResponseParams = CommonResponse & {
	data: {
		conversationContent: ConversationContent;
	};
};
