import { SocketIoClient } from './socketIO';

import { establishSocketListener } from '@/modules/gateway/gateway.controller';

import { IWebsocketClient } from './@types';
import { CLIENT_ID } from '@/utils/constants';
import { WEBSOCKET_URL } from '@/config/env';

export class WebSocketClient implements IWebsocketClient {
	private static instance: WebSocketClient | null = null;
	private readonly client: IWebsocketClient;

	private constructor(client: IWebsocketClient) {
		this.client = client;
	}

	public static getInstance(): WebSocketClient {
		if (!WebSocketClient.instance) {
			const socketIoClient = new SocketIoClient();
			WebSocketClient.instance = new WebSocketClient(socketIoClient);
		}

		return WebSocketClient.instance;
	}

	public connect(jwtToken: string, url?: string): void {
		this.client.connect(jwtToken, url || WEBSOCKET_URL);
		establishSocketListener(this.client);
	}

	public disconnect(): void {
		this.client.disconnect();
		localStorage.removeItem(CLIENT_ID);
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.client.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.client.emit(event, ...args);
	}
}
