import { HttpClient } from '@/network/http';

import type {
	IGoogleService,
	SigninWithGoogleRequestParam,
	SigninWithGoogleResponseParam,
} from '../@types';

export class GoogleAuthService implements IGoogleService {
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

	public signinWithGoogle = (params: SigninWithGoogleRequestParam) => {
		const url = '/auth/google';
		return this.httpClientInstance.post<SigninWithGoogleResponseParam>(
			url,
			params,
		);
	};
}
