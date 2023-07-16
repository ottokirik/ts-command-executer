import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import { CommandExecuter } from '../../core/executer/command-executer.js';
import { IStreamLogger } from '../../core/handlers/stream-logger.interface.js';
import { IFfmpegCommand, IFfmpegExecuterInput } from './ffmpeg.types.js';
import { MESSAGE } from '../../constants/messages.js';
import { IFileService } from '../../core/files/file.types.js';
import { IPrompt } from '../../core/prompt/prompt.types.js';
import { FfmpegBuilder } from './ffmpeg.builder.js';
import { StreamHandler } from '../../core/handlers/stream.handler.js';

const ffmpegCommand = 'ffmpeg';

export class FfmpegExecuter extends CommandExecuter<IFfmpegExecuterInput> {
	constructor(
		protected logger: IStreamLogger,
		private readonly fileService: IFileService,
		private readonly promptService: IPrompt,
	) {
		super(logger);
	}

	protected async prompt(): Promise<IFfmpegExecuterInput> {
		const pathToFile = await this.promptService.input<string>(MESSAGE.FFMPEG.INPUT.PATH_TO_FILE, 'input');
		const width = await this.promptService.input<number>(MESSAGE.FFMPEG.INPUT.VIDEO_WIDTH, 'number');
		const height = await this.promptService.input<number>(MESSAGE.FFMPEG.INPUT.VIDEO_HEIGHT, 'number');
		const newFileName = await this.promptService.input<string>(MESSAGE.FFMPEG.INPUT.OUTPUT_FILE_NAME, 'input');

		return {
			width,
			height,
			filePath: pathToFile,
			newFileName,
		};
	}

	protected build(input: IFfmpegExecuterInput): IFfmpegCommand {
		const { filePath, height, newFileName, width } = input;
		const builder = new FfmpegBuilder();
		const outputPath = this.fileService.getPath(filePath, newFileName, 'mp4');

		builder.input(filePath).setVideoSize(width, height).output(outputPath);

		return {
			command: ffmpegCommand,
			args: builder.build(),
			outputPath,
		};
	}

	protected spawn(command: IFfmpegCommand): ChildProcessWithoutNullStreams {
		const { args, command: ffmpeg, outputPath } = command;

		this.fileService.deleteFileIfExists(outputPath);

		return spawn(ffmpeg, args);
	}
	protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
		const handler = new StreamHandler(logger);
		handler.processOutput(stream);
	}
}
