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
				WebSocketClient.initialize(WEBSOCKET_URL, accessToken);
				WebSocketClient.getInstance().connect();
			} else {
				dispatch(setUnauthenticated());
				removeCredentialToken();
			}
		} catch (error: any) {
			toast.error(error.message);
			dispatch(setUnauthenticated());
			removeCredentialToken();
		}
	}, [dispatch]);
};

export default useAutoSignin;
