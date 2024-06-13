import { GatewayController } from './gateway.controller';

import { SOCKET_EVENTS } from './@types';
import type { IWebsocketClient } from '@/network/websocket/@types';

const gatewayControllerInstance = GatewayController.getInstance();

export const establishSocketListener = (socketClient: IWebsocketClient) => {
	socketClient.on(
		SOCKET_EVENTS.NEW_CONNECTION,
		gatewayControllerInstance.handleNewConnection,
	);

	socketClient.on(
		SOCKET_EVENTS.CONVERSATION_CREATE,
		gatewayControllerInstance.handleNewConversation,
	);

	socketClient.on(
		SOCKET_EVENTS.PROMPT_CREATE,
		gatewayControllerInstance.handlePromptCreated,
	);

	socketClient.on(
		SOCKET_EVENTS.ANSWER_CREATE,
		gatewayControllerInstance.handleReceiveAnswer,
	);
};
