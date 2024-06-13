import React, { useCallback, useEffect } from 'react';

import { CodeResponse, useGoogleLogin } from '@react-oauth/google';

import { IconContext } from 'react-icons';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

import { useAppSelector, useAppDispatch } from '@/store';
import { setAuthenticated } from '../state/auth.slice';
import { closeSigninDialog } from '@/modules/common/state/dialog.slice';
import { useSigninWithGoogleMutation } from '../query';
import { WebSocketClient } from '@/network/websocket';

import Dialog from '@/components/Dialog';

import { AUTHENTICATION_STATUS } from '../utils';
import { updateCredentialTokens } from '../helpers';
import { GOOGLE_REDIRECT_URI } from '@/config/env';

const SigninDialog: React.FC = () => {
	const { authStatus } = useAppSelector((state) => state.auth);
	const { isSigninDialogOpen } = useAppSelector((state) => state.dialog);

	const [
		signinWithGoogle,
		{
			data: signinWithGoogleResponse,
			isError: isSigninWithGoogleFail,
			isSuccess: isSigninWithGoogleSuccessful,
			error: signInWithGoogleError,
		},
	] = useSigninWithGoogleMutation();

	const dispatch = useAppDispatch();

	const handleGoogleSignin = useGoogleLogin({
		onSuccess: async (
			codeResponse: Omit<
				CodeResponse,
				'error' | 'error_description' | 'error_uri'
			>,
		) => {
			try {
				if (!codeResponse) {
					toast.error('There was an error during login. Please try again.');
					return;
				}

				signinWithGoogle({ authCode: codeResponse.code });
			} catch (error: any) {
				toast.error(
					error?.message ||
						'There was an error during login. Please try again.',
				);
			}
		},
		onError: (error) =>
			toast.error(
				error?.error_description ||
					'There was an error during login. Please try again.',
			),
		flow: 'auth-code',
		redirect_uri: GOOGLE_REDIRECT_URI,
	});

	const handleCloseSigninDialog = useCallback(() => {
		dispatch(closeSigninDialog());
	}, []);

	useEffect(() => {
		if (
			(!isEmpty(signInWithGoogleError) || isSigninWithGoogleFail) &&
			!signinWithGoogleResponse
		) {
			toast.error(
				(signInWithGoogleError as Error)?.message ||
					'There was an error during login. Please try again.',
			);
		}
		if (isSigninWithGoogleSuccessful) {
			if (signinWithGoogleResponse) {
				updateCredentialTokens(
					signinWithGoogleResponse.data.accessToken,
					signinWithGoogleResponse.data.refreshToken,
				);

				WebSocketClient.getInstance().connect(
					signinWithGoogleResponse.data.accessToken,
				);

				dispatch(setAuthenticated());
				dispatch(closeSigninDialog());
			}
		}
	}, [
		isSigninWithGoogleFail,
		isSigninWithGoogleSuccessful,
		signInWithGoogleError,
		signinWithGoogleResponse,
		dispatch,
	]);

	return (
		<Dialog
			isOpen={
				authStatus !== AUTHENTICATION_STATUS.AUTHENTICATED &&
				isSigninDialogOpen === true
			}
			onClose={handleCloseSigninDialog}
		>
			<div className="w-96 rounded-3xl bg-modal p-8">
				<div className="flex h-full w-full flex-col justify-start">
					<div className="flex flex-col items-center justify-start gap-2 text-white">
						<h2 className="font-['Inter'] text-4xl font-bold">StoryMe</h2>
						<p className="font-base">Please signin to continue</p>
					</div>
					<div className="-mx-2 mb-8 mt-3 h-[.0625rem] w-full bg-secondary-color" />
					<button
						className="relative flex h-14 w-full items-center justify-center rounded-3xl border-[0.0625rem] border-transparent bg-white font-['Inter'] text-base font-semibold text-primary-color hover:border-white hover:bg-main-bg hover:text-white"
						onClick={handleGoogleSignin}
					>
						<div className="flex items-center gap-3">
							<IconContext.Provider
								value={{
									style: {
										verticalAlign: 'middle',
										width: '1.5rem',
										height: '1.5rem',
									},
								}}
							>
								<FcGoogle />
							</IconContext.Provider>
							<span className="transition-colors">Sign in with Google</span>
						</div>
					</button>
				</div>
			</div>
		</Dialog>
	);
};

export default SigninDialog;
