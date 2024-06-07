import { createSlice } from '@reduxjs/toolkit';

import { AUTHENTICATION_STATUS } from '../utils';

interface AuthSliceState {
	authStatus: AUTHENTICATION_STATUS;
	isOpenSigninDialog: boolean;
}

const SLICE_NAME = 'auth';

const initialState: AuthSliceState = {
	authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATED,
	isOpenSigninDialog: false,
};

const authSlice = createSlice({
	name: SLICE_NAME,
	initialState,
	reducers: {
		setAuthenticated: (state) => ({
			...state,
			authStatus: AUTHENTICATION_STATUS.AUTHENTICATED,
		}),
		setUnauthenticated: (state) => ({
			...state,
			authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATED,
		}),
		authenticating: (state) => ({
			...state,
			authStatus: AUTHENTICATION_STATUS.AUTHENTICATING,
		}),
		openSigninDialog: (state) => ({
			...state,
			isOpenSigninDialog: true,
		}),
		closeSigninDialog: (state) => ({
			...state,
			isOpenSigninDialog: false,
		}),
	},
});

export const {
	setAuthenticated,
	setUnauthenticated,
	authenticating,
	closeSigninDialog,
	openSigninDialog,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
