export interface Conversation {
	id: string;
	title: string;
	createAt: string;
	updatedAt: string;
}

export interface Prompt {
	id: string;
	content: string;
	conversation: Conversation;
	attachment: string | null;
	createAt: string;
	updatedAt: string;
}

export interface Answer {
	id: string;
	content: string;
	conversation: Conversation;
	createAt: string;
	updatedAt: string;
}

export interface ConversationContent {
	id: string;
	title: string;
	createAt: string;
	updatedAt: string;
	answers: Answer[];
	prompts: Prompt[];
}

export interface DisplayContent {
	id: string;
	type: 'prompt' | 'answer';
	content: string;
	attachment: string | null;
	createAt: string;
}
