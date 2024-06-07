import { TOKEN_TYPE } from './utils/token.constant';
import {
	ACCESS_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/config/env';

import { CookieJwtStorage } from './cookie-jtw-storage';
import { IJwtStorage } from './@types';

export class AccessTokenStorage extends CookieJwtStorage {
	private static instance: IJwtStorage | null = null;

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
	private static instance: RefreshTokenStorage;

	constructor(tokenType: TOKEN_TYPE, expirationTime: number) {
		super(tokenType, expirationTime);
	}

	public static getInstance() {
		if (this.instance === null) {
			this.instance = new RefreshTokenStorage(
				TOKEN_TYPE.REFRESH_TOKEN,
				REFRESH_TOKEN_EXPIRATION_TIME,
			);
		}

		return this.instance;
	}
}
