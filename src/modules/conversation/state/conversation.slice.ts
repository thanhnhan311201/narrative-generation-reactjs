import { createSlice } from '@reduxjs/toolkit';

import { Conversation } from '../@types';

interface ConversationSliceState {
	conversations: Conversation[];
}

const SLICE_NAME = 'conversation';

const initialState: ConversationSliceState = {
	conversations: [],
};

const conversationSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setConversations: (
			state,
			action: {
				payload: Conversation[];
				type: string;
			},
		) => ({
			...state,
			conversations: action.payload,
		}),
		addConversation: (
			state,
			action: {
				payload: Conversation;
				type: string;
			},
		) => ({
			...state,
			conversations: [action.payload, ...state.conversations.concat()],
		}),
		removeConversation: (
			state,
			action: {
				payload: string; // conversation id
				type: string;
			},
		) => {
			const finalConversations = state.conversations.filter(
				(conversation) => conversation.id !== action.payload,
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
	},
});

export const {
	addConversation,
	removeConversation,
	setConversations,
	resetConversations,
} = conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
