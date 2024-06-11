import { SigninWithGoogleRequestParams } from './request-param.type';
import { SigninWithGoogleResponseParams } from './response-param.type';

export interface IGoogleAuthService {
	signin(
		params: SigninWithGoogleRequestParams,
	): Promise<SigninWithGoogleResponseParams>;
}
