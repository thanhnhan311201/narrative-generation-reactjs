import { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import queryString from 'query-string';

import { AccessTokenStorage } from '@/storage/JwtStorage';

import { BASE_URL_API } from '@/config/env';

// request middleware
export const handleRequest = (cfg: InternalAxiosRequestConfig) => {
	const token = AccessTokenStorage.getInstance().get();
	if (token) {
		cfg.headers.Authorization = `Bearer ${token}`;
	}

	return cfg;
};

// response middleware
export const handleResponse = (res: AxiosResponse) => {
	if (res.status === 200 || res.status === 201) {
		return res.data;
	}
};

export const handleFailedResponse = (err: any) => {
	return Promise.reject(err?.response.data);
};

// axios config
export const axiosConfig = {
	baseURL: BASE_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: {
		serialize: (params: any) => queryString.stringify(params),
	},
};
