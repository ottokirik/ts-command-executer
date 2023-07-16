import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from './stream-logger.interface.js';

export class StreamHandler {
	constructor(private readonly logger: IStreamLogger) {}

	processOutput(stream: ChildProcessWithoutNullStreams) {
		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		stream.stdout.on('data', (data: any) => this.logger.log(data));

		// rome-ignore lint/suspicious/noExplicitAny: <explanation>
		stream.stderr.on('data', (data: any) => this.logger.error(data));

		stream.on('close', () => this.logger.end());
	}
}
