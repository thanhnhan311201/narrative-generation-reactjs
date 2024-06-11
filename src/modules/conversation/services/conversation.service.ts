import { HttpClient } from '@/network/http';
import {
	CreateConversationRequestParams,
	GetConversationContentRequestParams,
	GetConversationContentResponseParams,
	GetConversationsResponseParams,
	IConversationService,
} from '../@types';
import { CommonResponse } from '@/modules/common/@types';

const baseUrl = 'conversation';

export class ConversationService implements IConversationService {
	private static instance: ConversationService | null = null;
	private readonly httpClientIns: HttpClient;

	private constructor(httpIns: HttpClient) {
		this.httpClientIns = httpIns;
	}

	public static getInstance(): ConversationService {
		if (!ConversationService.instance) {
			const _httpClientIns = HttpClient.getInstance();
			ConversationService.instance = new ConversationService(_httpClientIns);
		}

		return ConversationService.instance;
	}

	getConversations(): Promise<GetConversationsResponseParams> {
		const url = baseUrl;
		return this.httpClientIns.get<GetConversationsResponseParams>(url);
	}

	createConversation(
		params: CreateConversationRequestParams,
	): Promise<CommonResponse> {
		const url = baseUrl;
		return this.httpClientIns.post<CommonResponse>(url, params);
	}

	getConversationContent(
		params: GetConversationContentRequestParams,
	): Promise<GetConversationContentResponseParams> {
		const url = baseUrl + '/' + params.id;
		return this.httpClientIns.get<GetConversationContentResponseParams>(url);
	}
}
