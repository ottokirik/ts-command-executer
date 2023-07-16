import { ChildProcessWithoutNullStreams } from 'child_process';
import { IStreamLogger } from '../handlers/stream-logger.interface.js';
import { ICommandExecuter } from './command-executer.types.js';

export abstract class CommandExecuter<Input> {
	constructor(private readonly logger: IStreamLogger) {}

	async execute(): Promise<void> {
		const input = await this.prompt();
		const command = this.build(input);
		const stream = this.spawn(command);
		this.processStream(stream, this.logger);
	}

	protected abstract prompt(): Promise<Input>;
	protected abstract build(input: Input): ICommandExecuter;
	protected abstract spawn(command: ICommandExecuter): ChildProcessWithoutNullStreams;
	protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}
