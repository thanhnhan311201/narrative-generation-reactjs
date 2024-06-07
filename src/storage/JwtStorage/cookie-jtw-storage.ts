import { getCookieValue } from '@/helpers/general.helper';
import { IJwtStorage } from './@types';

export class CookieJwtStorage implements IJwtStorage {
	constructor(
		private tokenType: string,
		private expirationTime: number,
	) {}

	set(token: string): void {
		if (!token) {
			return;
		}

		const d = new Date();
		d.setTime(d.getTime() + this.expirationTime * 60 * 60 * 1000);
		const expires = 'expires=' + d.toUTCString();
		document.cookie = `${this.tokenType}=${token}; expires=${expires}; path=/`;
	}

	get(): string {
		const token = getCookieValue(this.tokenType);
		if (!token) {
			return '';
		}

		return token;
	}

	delete(): void {
		document.cookie = `${this.tokenType}= ; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}
