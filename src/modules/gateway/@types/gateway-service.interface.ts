import { User } from '@/modules/user/@types/user.type';

export interface IGatewayService {
	handleNewConnection(payload: {
		userInfo: User | null;
		clientId: string;
	}): void;
	handleNewConversation(payload: any): void;
}
