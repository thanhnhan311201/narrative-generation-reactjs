import { createSlice } from '@reduxjs/toolkit';

import type { Conversation, DisplayContent } from '../@types';
import type { ReducerAction } from '@/store';

interface ConversationSliceState {
	conversations: Conversation[];
	selectedConversationId: string | null;
	displayContents: DisplayContent[];
	isWaitingForAnswer: boolean;
}

const SLICE_NAME = 'conversation';

const initialState: ConversationSliceState = {
	conversations: [],
	selectedConversationId: null,
	displayContents: [],
	isWaitingForAnswer: false,
};

const conversationSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setConversations: (state, action: ReducerAction<Conversation[]>) => ({
			...state,
			conversations: action.payload,
		}),
		addConversation: (state, action: ReducerAction<Conversation>) => ({
			...state,
			conversations: [action.payload, ...state.conversations],
		}),
		removeConversation: (state, action: ReducerAction<{ id: string }>) => {
			const finalConversations = state.conversations.filter(
				(conversation) => conversation.id !== action.payload.id,
			);
			return {
				...state,
				conversations: finalConversations,
			};
		},
		resetConversations: (state) => ({
			...state,
			conversations: [],
		}),

		selectConversationId: (
			state,
			action: ReducerAction<{ id: string | null }>,
		) => ({
			...state,
			selectedConversationId: action.payload.id,
		}),

		setDisplayContents: (state, action: ReducerAction<DisplayContent[]>) => ({
			...state,
			displayContents: action.payload,
		}),
		addDisplayContent: (state, action: ReducerAction<DisplayContent>) => ({
			...state,
			displayContents: [...state.displayContents, action.payload],
			isWaitingForAnswer: action.payload.type === 'prompt',
		}),
		resetDisplayContents: (state) => ({
			...state,
			displayContents: [],
		}),
	},
});

export const {
	addConversation,
	removeConversation,
	setConversations,
	resetConversations,
	selectConversationId,
	addDisplayContent,
	resetDisplayContents,
	setDisplayContents,
} = conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
