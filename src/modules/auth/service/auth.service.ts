import { HttpClient } from '@/network/http';

import type {
	IAuthService,
	SigninRequestParam,
	SignUpRequestParam,
	SigninResponseParam,
	SignupResponseParam,
} from '../@types';
import type { CommonResponse } from '@/modules/common/@types';

export class AuthService implements IAuthService {
	private static instance: AuthService | null = null;
	private httpClientInstance: HttpClient;

	private constructor(httpIns: HttpClient) {
		this.httpClientInstance = httpIns;
	}

	public static getInstance(): AuthService {
		if (!AuthService.instance) {
			const _httpClientInstance = HttpClient.getInstance();
			AuthService.instance = new AuthService(_httpClientInstance);
		}

		return AuthService.instance;
	}

	public siginin = (params: SigninRequestParam) => {
		const url = '/auth/signin';
		return this.httpClientInstance.post<SigninResponseParam>(url, params);
	};

	public signup = (params: SignUpRequestParam) => {
		const url = '/auth/signup';
		return this.httpClientInstance.post<SignupResponseParam>(url, params);
	};

	public signout = () => {
		const url = '/auth/signout';
		return this.httpClientInstance.post<CommonResponse>(url, {});
	};

	public verifyToken = () => {
		const url = '/auth/verify-access-token';
		return this.httpClientInstance.get<CommonResponse>(url);
	};
}
