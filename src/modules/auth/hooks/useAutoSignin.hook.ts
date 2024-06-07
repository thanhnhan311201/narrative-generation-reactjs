import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { useAppDispatch } from '@/store';
// import socketClient from '@/socket';
// import { AccessTokenStorage } from '@/storage/JwtStorage';
// import {
// 	setUnauthenticated,
// 	authenticating,
// 	setAuthenticated,
// } from '../core/auth.slice';
// import { availableToTransfer } from '@/modules/transfer/core/transfer.slice';
// import AuthAPI from '../core/auth.service';

import { removeCredentialToken } from '../helpers';

const useAutoSignin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	// return useCallback(async () => {
	// 	try {
	// 		dispatch(authenticating());
	// 		const accessToken = AccessTokenStorage.getInstance().get();
	// 		if (accessToken) {
	// 			const response = await AuthAPI.verifyToken();
	// 			if (!response || response.status === 'error') {
	// 				dispatch(setUnauthenticated());
	// 				removeCredentialToken();
	// 				return;
	// 			}

	// 			dispatch(setAuthenticated());
	// 			dispatch(availableToTransfer());
	// 			socketClient.connect({
	// 				token: accessToken,
	// 			});
	// 			navigate('/transfer');
	// 		} else {
	// 			dispatch(setUnauthenticated());
	// 			removeCredentialToken();
	// 		}
	// 	} catch (error: any) {
	// 		toast.error(error.message);
	// 		dispatch(setUnauthenticated());
	// 		removeCredentialToken();
	// 	}
	// }, [dispatch, navigate]);
};

export default useAutoSignin;
