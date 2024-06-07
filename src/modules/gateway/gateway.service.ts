import { toast } from 'react-toastify';

import { WebSocketClient } from '@/network/websocket';

import { dispatch } from '@/store';
import { setUser } from '../user/state/user.slice';

import { IGatewayService } from './@types';
import { User } from '../user/@types/user.type';

export class GatewayService implements IGatewayService {
	private static instance: GatewayService | null = null;

	private constructor() {}

	public static getInstance(): GatewayService {
		if (!GatewayService.instance) {
			GatewayService.instance = new GatewayService();
		}

		return GatewayService.instance;
	}

	public handleNewConnection = (payload: {
		userInfo: User | null;
		clientId: string;
	}) => {
		if (!payload) {
			toast.error('Error');
			return;
		}

		if (payload.userInfo) {
			dispatch(setUser(payload.userInfo));
		}
		WebSocketClient.getInstance().clientId = payload.clientId;
	};
}
