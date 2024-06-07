import { TOKEN_TYPE } from './utils/token.constant';
import {
	ACCESS_TOKEN_EXPIRATION_TIME,
	REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/config/env';

import { CookieJwtStorage } from './cookie-jtw-storage';

export class AccessTokenStorage extends CookieJwtStorage {
	private static storageInstance: AccessTokenStorage;

	constructor(tokenType: TOKEN_TYPE, expirationTime: number) {
		super(tokenType, expirationTime);
	}

	public static getInstance() {
		if (this.storageInstance === null) {
			this.storageInstance = new AccessTokenStorage(
				TOKEN_TYPE.ACCESS_TOKEN,
				ACCESS_TOKEN_EXPIRATION_TIME,
			);
		}

		return this.storageInstance;
	}
}

export class RefreshTokenStorage extends CookieJwtStorage {
	private static storageInstance: RefreshTokenStorage;

	constructor(tokenType: TOKEN_TYPE, expirationTime: number) {
		super(tokenType, expirationTime);
	}

	public static getInstance() {
		if (this.storageInstance === null) {
			this.storageInstance = new RefreshTokenStorage(
				TOKEN_TYPE.REFRESH_TOKEN,
				REFRESH_TOKEN_EXPIRATION_TIME,
			);
		}

		return this.storageInstance;
	}
}
