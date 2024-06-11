import { CommonResponse } from '@/modules/common/@types';

// signup response param
export type SignupResponseParams = CommonResponse;

// signin response param
export type SigninResponseParams = CommonResponse & {
	data: {
		accessToken: string;
		refreshToken: string;
	};
};

// signin with google response param
export type SigninWithGoogleResponseParams = SigninResponseParams;
