import { toast } from 'react-toastify';

import { dispatch } from '@/store';
import { setUser } from '../user/state/user.slice';
import { User } from '../user/@types/user.type';

import { IGatewayService } from './@types';
import { CLIENT_ID } from '@/utils/constants';
import { Conversation } from '../conversation/@types';
import { addConversation } from '../conversation/state/conversation.slice';

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

		localStorage.setItem(CLIENT_ID, payload.clientId);
	};

	public handleNewConversation = (payload: Conversation) => {
		dispatch(addConversation(payload));
	};
}
