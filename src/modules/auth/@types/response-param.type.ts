import { CommonResponse } from '@/modules/common/@types';

// signup response param
export interface SignupResponseParam extends CommonResponse {}

// signin response param
export interface SigninResponseParam {
	status: string;
	data: {
		accessToken: string;
		refreshToken: string;
	};
}

// signin with google response param
export interface SigninWithGoogleResponseParam extends SigninResponseParam {}
