import { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import queryString from 'query-string';

import { AccessTokenStorage } from '@/storage/jwt-storage';

import { BASE_URL_API } from '@/config/env';
import { CLIENT_ID, SOCKET_CLIENT_ID_HEADER } from '@/utils/constants';

// request middleware
export const handleRequest = (cfg: InternalAxiosRequestConfig) => {
	const token = AccessTokenStorage.getInstance().get();
	if (token) {
		cfg.headers.Authorization = `Bearer ${token}`;
	}

	// use to indentify socket
	const clientId = localStorage.getItem(CLIENT_ID);
	if (clientId) {
		cfg.headers[SOCKET_CLIENT_ID_HEADER] = clientId;
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
	return Promise.reject(err?.response?.data || err?.message);
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
