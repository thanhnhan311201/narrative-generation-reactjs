import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { GoogleAuthService } from '../services';

import type {
	SigninWithGoogleRequestParams,
	SigninWithGoogleResponseParams,
} from '../@types';

export const GoogleAuthQueryService = createApi({
	reducerPath: 'googleAuthQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const googleAuthQueryApi = GoogleAuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signinWithGoogle: build.mutation<
			SigninWithGoogleResponseParams,
			SigninWithGoogleRequestParams
		>({
			async queryFn(arg: SigninWithGoogleRequestParams) {
				try {
					const res = await GoogleAuthService.getInstance().signin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const { useSigninWithGoogleMutation } = googleAuthQueryApi;
