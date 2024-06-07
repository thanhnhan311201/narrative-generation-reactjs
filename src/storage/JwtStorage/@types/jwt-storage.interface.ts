export interface IJwtStorage {
	set(token: string): void;
	get(): string;
	delete(): void;
}
