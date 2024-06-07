// signin request param
export interface SigninRequestParam {
	email: string;
	password: string;
}

// signup request param
export interface SignUpRequestParam {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
}

// signin with google request param
export interface SigninWithGoogleRequestParam {
	authCode: string;
}
