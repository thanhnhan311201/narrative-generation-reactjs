import { isEmpty } from 'lodash';

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const waitForInvoke = (cb: () => void, ms: number): NodeJS.Timeout =>
	setTimeout(() => cb(), ms);

export const formatFileSize = (size: number) => {
	if (size > 1024 && size < 1000000) {
		return `${Number(size.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'))
			.toFixed(2)
			.toString()} KB`;
	} else if (size > 1000000 && size < 1000000000) {
		return `${Number(size.toString().replace(/\B(?=(\d{6})+(?!\d))/g, '.'))
			.toFixed(2)
			.toString()} MB`;
	} else if (size > 1000000000) {
		return `${Number(size.toString().replace(/\B(?=(\d{9})+(?!\d))/g, '.'))
			.toFixed(2)
			.toString()} MB`;
	}

	return `${size} B`;
};

export const getCookieValue = (key: string) => {
	if (!key) {
		return null;
	}

	const decodedCookie = decodeURIComponent(document.cookie);
	const allCookies: string[] = decodedCookie.split(';');
	if (isEmpty(allCookies)) {
		return null;
	}

	const cookie: string | undefined = allCookies.find((cookie) =>
		cookie.trim().startsWith(key),
	);
	if (!cookie) {
		return null;
	}

	const value = cookie.split('=')[1];

	return value;
};

export const interleaveArrays = (arr1: any[], arr2: any[]): any[] => {
	const result = [];
	const maxLength = Math.max(arr1.length, arr2.length);

	for (let i = 0; i < maxLength; i++) {
		if (i < arr1.length) {
			result.push(arr1[i]);
		}
		if (i < arr2.length) {
			result.push(arr2[i]);
		}
	}

	return result;
};

export const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = () => resolve(reader.result as ArrayBuffer);
		reader.onerror = () => reject(new Error('Failed to read file'));

		reader.readAsArrayBuffer(file);
	});
};
