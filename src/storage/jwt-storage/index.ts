import { TOKEN_TYPE } from './utils/token.constant';
import {
	ACCESS_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/config/env';

import { CookieJwtStorage } from './cookie-jtw-storage';

export class AccessTokenStorage extends CookieJwtStorage {
	private static instance: AccessTokenStorage | null = null;

	private constructor(tokenType: TOKEN_TYPE, expirationTime: number) {
		super(tokenType, expirationTime);
	}

	public static getInstance() {
		if (AccessTokenStorage.instance === null) {
			AccessTokenStorage.instance = new AccessTokenStorage(
				TOKEN_TYPE.ACCESS_TOKEN,
				ACCESS_TOKEN_EXPIRATION_TIME,
			);
		}

		return AccessTokenStorage.instance;
	}
}

export class RefreshTokenStorage extends CookieJwtStorage {
	private static instance: RefreshTokenStorage | null = null;

	constructor(tokenType: TOKEN_TYPE, expirationTime: number) {
		super(tokenType, expirationTime);
	}

	public static getInstance() {
		if (RefreshTokenStorage.instance === null) {
			RefreshTokenStorage.instance = new RefreshTokenStorage(
				TOKEN_TYPE.REFRESH_TOKEN,
				REFRESH_TOKEN_EXPIRATION_TIME,
			);
		}

		return RefreshTokenStorage.instance;
	}
}
