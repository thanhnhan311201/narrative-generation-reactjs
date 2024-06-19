import { createSlice } from '@reduxjs/toolkit';

interface DialogSliceState {
	isCreateConversationDialogOpen: boolean;
}

const SLICE_NAME = 'dialog';

const initialState: DialogSliceState = {
	isCreateConversationDialogOpen: false,
};

const dialogSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
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

export const { closeCreateConversationDialog, openCreateConversationDialog } =
	dialogSlice.actions;

const dialogReducer = dialogSlice.reducer;
export default dialogReducer;
