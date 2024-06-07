import axios, {
	type InternalAxiosRequestConfig,
	type AxiosResponse,
} from 'axios';
import queryString from 'query-string';

import { AccessTokenStorage } from '@/storage/JwtStorage';

import { BASE_URL_API } from '@/config/env';

// request middleware
const handleRequest = (cfg: InternalAxiosRequestConfig) => {
	const token = AccessTokenStorage.getInstance().get();
	if (token) {
		cfg.headers.Authorization = `Bearer ${token}`;
	}

	return cfg;
};

// response middleware
const handleResponse = (res: AxiosResponse) => {
	if (res.status === 200 || res.status === 201) {
		return res.data;
	}
};

const handleFailedResponse = (err: any) => {
	return Promise.reject(err?.response.data);
};

// create axios instance
const axiosInstance = axios.create({
	baseURL: BASE_URL_API,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: { serialize: (params) => queryString.stringify(params) },
});

// handle request
axiosInstance.interceptors.request.use(handleRequest);

// handle response
axiosInstance.interceptors.response.use(handleResponse, handleFailedResponse);

export default axiosInstance;
