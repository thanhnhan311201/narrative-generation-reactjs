import { useCallback } from 'react';

import { toast } from 'react-toastify';

import { useAppDispatch } from '@/store';
import { WebSocketClient } from '@/network/websocket';
import { AccessTokenStorage } from '@/storage/JwtStorage';
import {
	setUnauthenticated,
	authenticating,
	setAuthenticated,
} from '../state/auth.slice';
import { AuthService } from '../services';

import { removeCredentialToken } from '../helpers';
import { WEBSOCKET_URL } from '@/config/env';
import { CLIENT_ID } from '@/utils/constants';
import { removeUser } from '@/modules/user/state/user.slice';
import { resetConversations } from '@/modules/conversation/state/conversation.slice';

const useAutoSignin = () => {
	const dispatch = useAppDispatch();

	return useCallback(async () => {
		try {
			dispatch(authenticating());
			const accessToken = AccessTokenStorage.getInstance().get();
			if (accessToken) {
				const response = await AuthService.getInstance().verifyToken();
				if (!response || response.status === 'error') {
					dispatch(setUnauthenticated());
					removeCredentialToken();
					return;
				}

				dispatch(setAuthenticated());
				WebSocketClient.getInstance().connect(accessToken);
			} else {
				dispatch(setUnauthenticated());
				dispatch(removeUser());
				dispatch(resetConversations());
				removeCredentialToken();
				localStorage.removeItem(CLIENT_ID);
			}
		} catch (error: any) {
			toast.error(error.message);
			dispatch(setUnauthenticated());
			dispatch(removeUser());
			dispatch(resetConversations());
			removeCredentialToken();
			localStorage.removeItem(CLIENT_ID);
		}
	}, [dispatch]);
};

export default useAutoSignin;
