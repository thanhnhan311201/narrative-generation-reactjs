export type CreateConversationRequestParams = {
	title: string;
};

export type GetConversationContentRequestParams = {
	id: string;
};

export type CreatePromptRequestParams = {
	id: string;
	content: string;
	attachment: File | null;
};
