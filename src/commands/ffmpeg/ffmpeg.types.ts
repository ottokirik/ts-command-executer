import { ICommandExecuter } from '../../core/executer/command-executer.types';

export interface IFfmpegExecuterInput {
	width: number;
	height: number;
	filePath: string;
	newFileName: string;
}

export interface IFfmpegCommand extends ICommandExecuter {
	outputPath: string;
}
