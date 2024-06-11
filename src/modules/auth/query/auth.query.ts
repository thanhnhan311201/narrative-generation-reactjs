import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { AuthService } from '../services';

import type {
	SignUpRequestParams,
	SigninRequestParams,
	SigninResponseParams,
	SignupResponseParams,
} from '../@types';

export const AuthQueryService = createApi({
	reducerPath: 'authQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const authQueryApi = AuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signin: build.mutation<SigninResponseParams, SigninRequestParams>({
			async queryFn(arg: SigninRequestParams) {
				try {
					const res = await AuthService.getInstance().signin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signup: build.mutation<SignupResponseParams, SignUpRequestParams>({
			async queryFn(arg: SignUpRequestParams) {
				try {
					const res = await AuthService.getInstance().signup(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const { useSigninMutation, useSignupMutation } = authQueryApi;
