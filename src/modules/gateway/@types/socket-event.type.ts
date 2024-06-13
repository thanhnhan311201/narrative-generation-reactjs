export enum SOCKET_EVENTS {
	// general
	NEW_CONNECTION = 'new_connection',
	SIGNOUT = 'signout',

	// conversation events
	CONVERSATION_CREATE = 'conversation:create',

	// prompt events
	PROMPT_CREATE = 'prompt:create',
	ANSWER_CREATE = 'answer:create',
}
