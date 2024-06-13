import { toast } from 'react-toastify';

import { SocketIoClient } from './socketIO';

import { AuthService } from '@/modules/auth/services';
import { establishSocketListener } from '@/modules/gateway/gateway.listener';

import { dispatch } from '@/store';
import { removeUser } from '@/modules/user/state/user.slice';
import { setUnauthenticated } from '@/modules/auth/state/auth.slice';
import { resetConversations } from '@/modules/conversation/state/conversation.slice';

import type { IWebsocketClient } from './@types';
import { CLIENT_ID } from '@/utils/constants';
import { WEBSOCKET_URL } from '@/config/env';
import { removeCredentialToken } from '@/modules/auth/helpers';

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

		this.client.on('connect_error', async (error) => {
			toast.error(error.message);

			await AuthService.getInstance().signout();
			removeCredentialToken();
			dispatch(resetConversations());
			dispatch(setUnauthenticated());
			dispatch(removeUser());
			localStorage.removeItem(CLIENT_ID);
		});

		this.client.on('error', (error) => {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message);
			}

			toast.error('Internal Servel Error');
		});

		this.client.on('disconnect', (reason) => {
			console.log(reason);
			WebSocketClient.instance = null;
		});
	}

	public disconnect(): void {
		this.client.disconnect();
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.client.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.client.emit(event, ...args);
	}
}
