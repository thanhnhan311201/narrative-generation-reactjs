import { CommonResponse } from '@/modules/common/@types';
import { SignUpRequestParams, SigninRequestParams } from './request-param.type';
import { SigninResponseParams } from './response-param.type';

export interface IAuthService {
	signin(params: SigninRequestParams): Promise<SigninResponseParams>;
	signup(params: SignUpRequestParams): Promise<CommonResponse>;
	signout(): Promise<CommonResponse>;
	verifyToken(): Promise<CommonResponse>;
}
