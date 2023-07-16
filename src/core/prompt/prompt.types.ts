export type PromptType = 'input' | 'password' | 'number';

export interface IPrompt {
	input<T>(message: string, type: PromptType): Promise<T>;
}
