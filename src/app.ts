import { FfmpegExecuter } from './commands/ffmpeg/ffmpeg.executer.js';
import { FileService } from './core/files/file.service.js';
import { PromptService } from './core/prompt/prompt.service.js';
import { ConsoleLogger } from './out/console-logger/console-logger.js';

class App {
	async run() {
		const executer = new FfmpegExecuter(ConsoleLogger.getInstance(), new FileService(), new PromptService());
		executer.execute();
	}
}

const app = new App();
app.run();
