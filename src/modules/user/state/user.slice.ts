import { createSlice } from '@reduxjs/toolkit';

import { IUser } from '../@types/user.interface';

interface UserSliceState {
	userInfo: IUser | null;
}

const SLICE_NAME = 'user';

const initialState: UserSliceState = {
	userInfo: null,
};

const userSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setUser: (
			state,
			action: {
				payload: IUser;
				type: string;
			},
		) => ({
			...state,
			userInfo: action.payload,
		}),
		removeUser: (state) => ({
			...state,
			userInfo: null,
		}),
	},
});

export const { removeUser, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
