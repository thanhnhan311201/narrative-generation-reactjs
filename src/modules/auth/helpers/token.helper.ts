import { AccessTokenStorage, RefreshTokenStorage } from '@/storage/jwt-storage';

export const updateCredentialTokens = (
	accessToken: string,
	refreshToken: string,
) => {
	if (!accessToken || !refreshToken) {
		return;
	}

	AccessTokenStorage.getInstance().set(accessToken);
	RefreshTokenStorage.getInstance().set(refreshToken);
};

export const removeCredentialToken = () => {
	AccessTokenStorage.getInstance().delete();
	RefreshTokenStorage.getInstance().delete();
};
