import { GatewayService } from './gateway.service';

import { SOCKET_EVENTS } from './@types';
import { IWebsocketClient } from '@/network/websocket/@types';

const gatewayServiceInstance = GatewayService.getInstance();

export const establishSocketListener = (socketClient: IWebsocketClient) => {
	socketClient.on(
		SOCKET_EVENTS.NEW_CONNECTION,
		gatewayServiceInstance.handleNewConnection,
	);

	socketClient.on(
		SOCKET_EVENTS.CONVERSATION_CREATE,
		gatewayServiceInstance.handleNewConversation,
	);
};
