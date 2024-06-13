import { CommonResponse } from '@/modules/common/@types';
import {
	CreateConversationRequestParams,
	CreatePromptRequestParams,
	GetConversationContentRequestParams,
} from './request-param.interface';
import {
	GetConversationContentResponseParams,
	GetConversationsResponseParams,
} from './response-param.type';

export interface IConversationService {
	getConversations(): Promise<GetConversationsResponseParams>;
	createConversation(
		params: CreateConversationRequestParams,
	): Promise<CommonResponse>;
	getConversationContent(
		params: GetConversationContentRequestParams,
	): Promise<GetConversationContentResponseParams>;
	createPrompt(params: CreatePromptRequestParams): Promise<CommonResponse>;
}
