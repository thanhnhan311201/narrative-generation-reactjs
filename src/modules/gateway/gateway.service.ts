import { toast } from 'react-toastify';

import { dispatch } from '@/store';
import { setUser } from '../user/state/user.slice';
import { User } from '../user/@types/user.type';

import { IGatewayService } from './@types';
import { CLIENT_ID } from '@/utils/constants';
import { Answer, Conversation, Prompt } from '../conversation/@types';
import {
	addConversation,
	addDisplayContent,
} from '../conversation/state/conversation.slice';
import { CacheFile } from '@/utils/cache-file';
import { FileStorage } from '@/storage/file-storage';

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

	public handleReceiveNewPrompt(payload: Prompt): void {
		const file = CacheFile.getInstance().file;

		if (file && !payload.attachment) {
			toast.error(
				'There was an error during creating prompt. Please try again.',
			);
			return;
		} else if (file && payload.attachment) {
			FileStorage.getInstance().storeFile(file, payload.attachment);
			CacheFile.getInstance().file = null;
		}

		dispatch(
			addDisplayContent({
				id: payload.id,
				content: payload.content,
				type: 'prompt',
				createAt: payload.createAt,
				attachment: payload.attachment,
			}),
		);
	}

	public handleReceiveAnswer(payload: Answer): void {
		dispatch(
			addDisplayContent({
				id: payload.id,
				content: payload.content,
				type: 'answer',
				createAt: payload.createAt,
				attachment: null,
			}),
		);
	}
}
