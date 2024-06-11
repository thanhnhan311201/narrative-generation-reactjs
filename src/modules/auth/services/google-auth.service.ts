import { HttpClient } from '@/network/http';

import type {
	IGoogleAuthService,
	SigninWithGoogleRequestParams,
	SigninWithGoogleResponseParams,
} from '../@types';

export class GoogleAuthService implements IGoogleAuthService {
	private static instance: GoogleAuthService | null = null;
	private httpClientInstance: HttpClient;

	private constructor(httpIns: HttpClient) {
		this.httpClientInstance = httpIns;
	}

	public static getInstance(): GoogleAuthService {
		if (!GoogleAuthService.instance) {
			const _httpClientInstance = HttpClient.getInstance();
			GoogleAuthService.instance = new GoogleAuthService(_httpClientInstance);
		}

		return GoogleAuthService.instance;
	}

	public signin = (params: SigninWithGoogleRequestParams) => {
		const url = '/auth/google';
		return this.httpClientInstance.post<SigninWithGoogleResponseParams>(
			url,
			params,
		);
	};
}
