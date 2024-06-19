import { readFileAsArrayBuffer } from '@/helpers/general.helper';
import { Dexie, type EntityTable } from 'dexie';

import type { StoredFile, IFileStorage } from './@types';

export class IndexedDBFileStorage implements IFileStorage {
	private readonly db: Dexie & {
		files: EntityTable<StoredFile, 'id'>;
	};

	constructor() {
		this.db = new Dexie('FileDatabase') as Dexie & {
			files: EntityTable<StoredFile, 'id'>;
		};
		this.db.version(1).stores({
			files: '++id, name, cloudKey, size, mimeType, content',
		});
	}

	public async storeFile(file: File, key: string): Promise<void> {
		const arrayBuffer = await readFileAsArrayBuffer(file);
		const buffer = Buffer.from(arrayBuffer);

		this.db.files.add({
			name: file.name,
			mimeType: file.type,
			size: file.size,
			content: buffer.toString('utf-8'),
			id: key,
		});
	}

	public async deleteFile(key: string): Promise<void> {
		await this.db.files.delete(key);
	}

	public async getFile(key: string): Promise<StoredFile | null> {
		const file = await this.db.files.get(key);

		return file || null;
	}
}
