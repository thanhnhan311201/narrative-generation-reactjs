import type {
	Answer,
	Conversation,
	Prompt,
} from '@/modules/conversation/@types';
import type { User } from '@/modules/user/@types/user.type';

export interface IGatewayService {
	handleNewConnection(payload: {
		userInfo: User | null;
		clientId: string;
	}): void;
	handleNewConversation(payload: Conversation): void;
	handleReceiveNewPrompt(payload: Prompt): void;
	handleReceiveAnswer(payload: Answer): void;
}
