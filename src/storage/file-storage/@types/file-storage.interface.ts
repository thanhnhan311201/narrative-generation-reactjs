export interface StoredFile {
	id: string;
	name: string;
	content: string;
	size: number;
	mimeType: string;
}

export interface IFileStorage {
	storeFile(file: File, key: string): Promise<void>;
	deleteFile(key: string): Promise<void>;
	getFile(key: string): Promise<StoredFile | null>;
}
