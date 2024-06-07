import { SocketIoClient } from './socketIO';

import { establishSocketListener } from '@/modules/gateway/gateway.controller';

import { IWebsocketClient } from './@types';

export class WebSocketClient implements IWebsocketClient {
	private static instance: WebSocketClient | null = null;
	private static url: string | null = null;
	private static token: string | null = null;
	private client: IWebsocketClient;
	private _clientId: string | null = null;

	private constructor(client: IWebsocketClient) {
		this.client = client;
	}

	public static initialize(url: string, token: string): void {
		WebSocketClient.url = url;
		WebSocketClient.token = token;
	}

	public get clientId(): string | null {
		return this._clientId;
	}

	public set clientId(newId: string) {
		this._clientId = newId;
	}

	public static getInstance(): WebSocketClient {
		if (!WebSocketClient.instance) {
			if (!WebSocketClient.url || !WebSocketClient.token) {
				throw new Error(
					'WebSocketClient is not initialized. Call initialize(url, token) first.',
				);
			} else {
				const socketIoClient = new SocketIoClient(
					WebSocketClient.url,
					WebSocketClient.token,
				);
				WebSocketClient.instance = new WebSocketClient(socketIoClient);
			}
		}

		return WebSocketClient.instance;
	}

	public connect(): void {
		this.client.connect();
		establishSocketListener(this.client);
	}

	public disconnect(): void {
		this.client.disconnect();
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		console.log('on');
		this.client.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.client.emit(event, ...args);
	}
}
