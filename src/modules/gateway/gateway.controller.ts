import { GatewayService } from './gateway.service';

import type { User } from '../user/@types/user.type';
import type { Answer, Conversation, Prompt } from '../conversation/@types';

const gatewayServiceInstance = GatewayService.getInstance();

export class GatewayController {
	private static instance: GatewayController | null = null;

	private constructor() {}

	public static getInstance(): GatewayController {
		if (!GatewayController.instance) {
			GatewayController.instance = new GatewayController();
		}

		return GatewayController.instance;
	}

	public handleNewConnection = (payload: {
		userInfo: User | null;
		clientId: string;
	}) => {
		gatewayServiceInstance.handleNewConnection(payload);
	};

	public handleNewConversation = (payload: Conversation) => {
		gatewayServiceInstance.handleNewConversation(payload);
	};

	public handlePromptCreated = (payload: Prompt) => {
		gatewayServiceInstance.handleReceiveNewPrompt(payload);
	};

	public handleReceiveAnswer = (payload: Answer) => {
		gatewayServiceInstance.handleReceiveAnswer(payload);
	};
}
