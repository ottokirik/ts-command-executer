import { PromptService } from './core/prompt/prompt.service.js';

class App {
	async run() {
		const result = await new PromptService().input<number>('Число', 'number');
		console.log(result);
	}
}

const app = new App();
app.run();
