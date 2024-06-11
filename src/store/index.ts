import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import {
	Middleware,
	StateFromReducersMapObject,
	configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import authReducer from '@/modules/auth/state/auth.slice';
import userReducer from '@/modules/user/state/user.slice';
import conversationReducer from '@/modules/conversation/state/conversation.slice';
import dialogReducer from '@/modules/common/state/dialog.slice';

import { AuthQueryService, GoogleAuthQueryService } from '@/modules/auth/query';
import { ConversationQueryService } from '@/modules/conversation/query/conversation.query';

const middlewares: Middleware[] = [
	AuthQueryService.middleware,
	GoogleAuthQueryService.middleware,
	ConversationQueryService.middleware,
];
const reducers = {
	// main reducer
	auth: authReducer,
	user: userReducer,
	conversation: conversationReducer,
	dialog: dialogReducer,

	// query service reducer
	[AuthQueryService.reducerPath]: AuthQueryService.reducer,
	[GoogleAuthQueryService.reducerPath]: GoogleAuthQueryService.reducer,
	[ConversationQueryService.reducerPath]: ConversationQueryService.reducer,
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(middlewares),
});

// use for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = StateFromReducersMapObject<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const dispatch = store.dispatch;

export default store;
