export interface IWebsocketClient {
	connect(jwtToken: string, url?: string): void;
	disconnect(): void;
	on(event: string, callback: (...args: any[]) => void): void;
	emit(event: string, ...args: any[]): void;
}
