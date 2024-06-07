import { AxiosHttpClient } from './axios';

import { IHttpClient } from './@types';

export class HttpClient implements IHttpClient {
	private httpClient: IHttpClient;
	private static instance: HttpClient | null = null;

	private constructor(client: IHttpClient) {
		this.httpClient = client;
	}

	public static getInstance(): HttpClient {
		if (!HttpClient.instance) {
			const axiosClient = new AxiosHttpClient();
			HttpClient.instance = new HttpClient(axiosClient);
		}

		return HttpClient.instance;
	}

	public async get<T>(url: string, config?: any): Promise<T> {
		return this.httpClient.get<T>(url, config);
	}

	public async post<T>(url: string, data: any, config?: any): Promise<T> {
		return this.httpClient.post<T>(url, data, config);
	}

	public async put<T>(url: string, data: any, config?: any): Promise<T> {
		return this.httpClient.put<T>(url, data, config);
	}

	public async patch<T>(url: string, data: any, config?: any): Promise<T> {
		return this.httpClient.patch<T>(url, data, config);
	}

	public async delete<T>(url: string, config?: any): Promise<T> {
		return this.httpClient.delete<T>(url, config);
	}

	public async postForm<T>(
		url: string,
		formData: FormData,
		config?: any,
	): Promise<T> {
		return this.httpClient.postForm<T>(url, formData, config);
	}

	public async putForm<T>(
		url: string,
		formData: FormData,
		config?: any,
	): Promise<T> {
		return this.httpClient.putForm<T>(url, formData, config);
	}

	public async patchForm<T>(
		url: string,
		formData: FormData,
		config?: any,
	): Promise<T> {
		return this.httpClient.patchForm<T>(url, formData, config);
	}
}
