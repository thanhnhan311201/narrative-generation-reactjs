import { HttpClient } from '@/network/http';

import type {
	IAuthService,
	SigninRequestParams,
	SignUpRequestParams,
	SigninResponseParams,
	SignupResponseParams,
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

	public signin = (params: SigninRequestParams) => {
		const url = '/auth/signin';
		return this.httpClientInstance.post<SigninResponseParams>(url, params);
	};

	public signup = (params: SignUpRequestParams) => {
		const url = '/auth/signup';
		return this.httpClientInstance.post<SignupResponseParams>(url, params);
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
