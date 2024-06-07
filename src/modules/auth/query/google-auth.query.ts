import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { GoogleAuthService } from '../service';

import type { SigninWithGoogleRequestParam } from '../@types';
import type { SigninWithGoogleResponseParam } from '../@types';

export const GoogleAuthQueryService = createApi({
	reducerPath: 'googleAuthQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const googleAuthQueryApi = GoogleAuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signinWithGoogle: build.mutation<
			SigninWithGoogleResponseParam,
			SigninWithGoogleRequestParam
		>({
			async queryFn(arg: SigninWithGoogleRequestParam) {
				try {
					const res =
						await GoogleAuthService.getInstance().signinWithGoogle(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const { useSigninWithGoogleMutation } = googleAuthQueryApi;
