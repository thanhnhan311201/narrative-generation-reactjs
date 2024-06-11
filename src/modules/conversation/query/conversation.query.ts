import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { ConversationService } from '../services';

import type {
	CreateConversationRequestParams,
	GetConversationContentRequestParams,
	GetConversationContentResponseParams,
	GetConversationsResponseParams,
} from '../@types';
import { CommonResponse } from '@/modules/common/@types';

export const ConversationQueryService = createApi({
	reducerPath: 'conversationService',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const conversationServiceApi = ConversationQueryService.injectEndpoints({
	endpoints: (build) => ({
		createConversation: build.mutation<
			CommonResponse,
			CreateConversationRequestParams
		>({
			async queryFn(arg: CreateConversationRequestParams) {
				try {
					const res =
						await ConversationService.getInstance().createConversation(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		getConversations: build.query<GetConversationsResponseParams, void>({
			async queryFn() {
				try {
					const res =
						await ConversationService.getInstance().getConversations();
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		getConversationContent: build.query<
			GetConversationContentResponseParams,
			GetConversationContentRequestParams
		>({
			async queryFn(arg: GetConversationContentRequestParams) {
				try {
					const res =
						await ConversationService.getInstance().getConversationContent(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const {
	useCreateConversationMutation,
	useLazyGetConversationContentQuery,
	useLazyGetConversationsQuery,
} = conversationServiceApi;
