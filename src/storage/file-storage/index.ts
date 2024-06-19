import { IndexedDBFileStorage } from './indexedDB-storage';

import type { IFileStorage, StoredFile } from './@types';

export class FileStorage implements IFileStorage {
	private fileStorage: IFileStorage;
	private static instance: FileStorage | null = null;

	private constructor(client: IFileStorage) {
		this.fileStorage = client;
	}

	public static getInstance(): FileStorage {
		if (!FileStorage.instance) {
			const indexedStorage = new IndexedDBFileStorage();
			FileStorage.instance = new FileStorage(indexedStorage);
		}

		return FileStorage.instance;
	}

	public storeFile(file: File, key: string): Promise<void> {
		return this.fileStorage.storeFile(file, key);
	}

	public getFile(key: string): Promise<StoredFile | null> {
		return this.fileStorage.getFile(key);
	}

	public deleteFile(key: string): Promise<void> {
		return this.fileStorage.deleteFile(key);
	}
}
