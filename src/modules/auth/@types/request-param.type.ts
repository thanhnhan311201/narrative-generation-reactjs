// signin request param
export type SigninRequestParams = {
	email: string;
	password: string;
};

// signup request param
export type SignUpRequestParams = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

// signin with google request param
export type SigninWithGoogleRequestParams = {
	authCode: string;
};
