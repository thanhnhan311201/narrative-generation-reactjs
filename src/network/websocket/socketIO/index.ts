import io, { type Socket } from 'socket.io-client';

import { IWebsocketClient } from '../@types';

export class SocketIoClient implements IWebsocketClient {
	private socket: Socket;

	constructor(url: string, jwtToken: string) {
		this.socket = io(url, {
			withCredentials: true,
			auth: {
				token: jwtToken,
			},
			autoConnect: false,
		});
	}

	public connect(): void {
		this.socket.connect();
	}

	public disconnect(): void {
		this.socket.disconnect();
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.socket.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.socket.emit(event, ...args);
	}
}
