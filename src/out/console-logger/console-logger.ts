import { MESSAGE } from '../../constants/messages.js';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface.js';

export class ConsoleLogger implements IStreamLogger {
	private static instance: ConsoleLogger;

	private constructor() {}

	static getInstance(): ConsoleLogger {
		if (!ConsoleLogger.instance) {
			ConsoleLogger.instance = new ConsoleLogger();
		}

		return ConsoleLogger.instance;
	}

	log(...args: unknown[]): void {
		console.log(...args);
	}

	error(...args: unknown[]): void {
		console.error(...args);
	}

	end(): void {
		console.log(MESSAGE.CONSOLE.END);
	}
}
