const devEnv: boolean = import.meta.env.NODE_ENV === 'development';

export const BASE_URL = devEnv
	? 'http://transferme.local.com:3000'
	: (import.meta.env.VITE_BASE_URL as string);

export const BASE_URL_API = devEnv
	? 'http://transferme.local.com:8080/api/v1'
	: (import.meta.env.VITE_BASE_URL_API as string);

export const BASE_URL_SERVER = devEnv
	? 'http://transferme.local.com:8080'
	: (import.meta.env.VITE_BASE_SERVER as string);

export const WEBSOCKET_URL = devEnv
	? 'http://transferme.local.com:8080'
	: (import.meta.env.VITE_WEBSOCKET_URL as string);
