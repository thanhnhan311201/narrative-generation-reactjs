import { readFileAsArrayBuffer } from '@/helpers/general.helper';
import { Dexie, type EntityTable } from 'dexie';

export interface StoredFile {
	id: string;
	name: string;
	content: string;
	size: number;
	mimeType: string;
}

export class FileStorage {
	private static instance: FileStorage | null = null;
	private readonly db: Dexie & {
		files: EntityTable<StoredFile, 'id'>;
	};

	private constructor() {
		this.db = new Dexie('FileDatabase') as Dexie & {
			files: EntityTable<StoredFile, 'id'>;
		};
		this.db.version(1).stores({
			files: '++id, name, cloudKey, size, mimeType, content',
		});
	}

	public static getInstance() {
		if (FileStorage.instance === null) {
			FileStorage.instance = new FileStorage();
		}

		return FileStorage.instance;
	}

	public async storeFile(file: File, key: string) {
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

	public async deleteFile(key: string) {
		await this.db.files.delete(key);

		return true;
	}

	public async getFile(key: string) {
		const file = await this.db.files.get(key);

		return file;
	}
}
