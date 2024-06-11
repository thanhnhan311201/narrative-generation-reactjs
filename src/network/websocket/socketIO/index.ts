import io, { type Socket } from 'socket.io-client';

import { IWebsocketClient } from '../@types';

export class SocketIoClient implements IWebsocketClient {
	private socket: Socket | null = null;

	constructor() {}

	public connect(jwtToken: string, url: string): void {
		this.socket = io(url, {
			withCredentials: true,
			auth: {
				token: jwtToken,
			},
		});
	}

	public disconnect(): void {
		this.socket?.disconnect();
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.socket?.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.socket?.emit(event, ...args);
	}
}
