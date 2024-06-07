import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { AuthService } from '../services';

import type { SignUpRequestParam, SigninRequestParam } from '../@types';
import type { SigninResponseParam, SignupResponseParam } from '../@types';

export const AuthQueryService = createApi({
	reducerPath: 'authQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const authQueryApi = AuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signin: build.mutation<SigninResponseParam, SigninRequestParam>({
			async queryFn(arg: SigninRequestParam) {
				try {
					const res = await AuthService.getInstance().siginin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signup: build.mutation<SignupResponseParam, SignUpRequestParam>({
			async queryFn(arg: SignUpRequestParam) {
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
