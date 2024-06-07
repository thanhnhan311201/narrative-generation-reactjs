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
			conversations: state.conversations.concat(action.payload),
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
	},
});

export const { addConversation, removeConversation, setConversations } =
	conversationSlice.actions;

const conversationReducer = conversationSlice.reducer;
export default conversationReducer;
