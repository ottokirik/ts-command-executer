import inquirer from 'inquirer';
import { IPrompt, PromptType } from './prompt.types.js';

export class PromptService implements IPrompt {
	async input<T>(message: string, type: PromptType) {
		const { result } = await inquirer.prompt<{ result: T }>([
			{
				type,
				name: 'result',
				message,
			},
		]);

		return result;
	}
}
