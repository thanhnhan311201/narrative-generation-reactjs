export class CacheFile {
	private static instance: CacheFile | null = null;
	private _file: File | null = null;

	private constructor() {}

	public static getInstance() {
		if (CacheFile.instance === null) {
			CacheFile.instance = new CacheFile();
		}

		return CacheFile.instance;
	}

	get file(): File | null {
		return this._file;
	}

	set file(newFile: File | null) {
		this._file = newFile;
	}
}
