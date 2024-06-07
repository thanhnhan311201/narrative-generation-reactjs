import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import {
	axiosConfig,
	handleFailedResponse,
	handleRequest,
	handleResponse,
} from './axios.config';

import { IHttpClient } from '../@types';

export class AxiosHttpClient implements IHttpClient {
	private axiosInstance: AxiosInstance;

	constructor() {
		this.axiosInstance = axios.create(axiosConfig);
		this.axiosInstance.interceptors.request.use(handleRequest);
		this.axiosInstance.interceptors.response.use(
			handleResponse,
			handleFailedResponse,
		);
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.get<any, T>(url, config);
		return response;
	}

	public async post<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.post<any, T>(url, data, config);
		return response;
	}

	public async put<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.put<any, T>(url, data, config);
		return response;
	}

	public async patch<T>(
		url: string,
		data: any,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.patch<any, T>(url, data, config);
		return response;
	}

	public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		const response = await this.axiosInstance.delete<any, T>(url, config);
		return response;
	}

	public async postForm<T>(
		url: string,
		formData: FormData,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.post<any, T>(url, formData, {
			...config,
			headers: {
				'Content-Type': 'multipart/form-data',
				...(config?.headers || {}),
			},
		});
		return response;
	}

	public async putForm<T>(
		url: string,
		formData: FormData,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.put<any, T>(url, formData, {
			...config,
			headers: {
				'Content-Type': 'multipart/form-data',
				...(config?.headers || {}),
			},
		});
		return response;
	}

	public async patchForm<T>(
		url: string,
		formData: FormData,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response = await this.axiosInstance.patch<any, T>(url, formData, {
			...config,
			headers: {
				'Content-Type': 'multipart/form-data',
				...(config?.headers || {}),
			},
		});

		return response;
	}

	public async call(
		requestCfg: AxiosRequestConfig,
	): Promise<AxiosResponse<any, any>> {
		const response = await this.axiosInstance(requestCfg);
		return response;
	}
}
