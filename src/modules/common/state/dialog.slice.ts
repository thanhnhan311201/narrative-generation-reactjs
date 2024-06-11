import { createSlice } from '@reduxjs/toolkit';

interface DialogSliceState {
	isSigninDialogOpen: boolean;
	isCreateConversationDialogOpen: boolean;
}

const SLICE_NAME = 'dialog';

const initialState: DialogSliceState = {
	isSigninDialogOpen: false,
	isCreateConversationDialogOpen: false,
};

const dialogSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		// open dialog
		openSigninDialog: (state) => ({
			...state,
			isSigninDialogOpen: true,
		}),
		closeSigninDialog: (state) => ({
			...state,
			isSigninDialogOpen: false,
		}),

		// create conversation dialog
		openCreateConversationDialog: (state) => ({
			...state,
			isCreateConversationDialogOpen: true,
		}),
		closeCreateConversationDialog: (state) => ({
			...state,
			isCreateConversationDialogOpen: false,
		}),
	},
});

export const {
	closeSigninDialog,
	openSigninDialog,
	closeCreateConversationDialog,
	openCreateConversationDialog,
} = dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
