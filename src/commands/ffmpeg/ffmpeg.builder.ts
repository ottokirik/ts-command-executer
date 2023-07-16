import { MESSAGE } from '../../constants/messages.js';

export class FfmpegBuilder {
	private inputPath = '';
	private outputPath = '';
	private options: Map<string, string> = new Map();

	constructor() {
		this.options.set('-c:v', 'libx264');
	}

	input(inputPath: string): this {
		this.inputPath = inputPath;
		return this;
	}

	setVideoSize(width: number, height: number): this {
		this.options.set('-s', `${width}x${height}`);
		return this;
	}

	output(outputPath: string): this {
		this.outputPath = outputPath;
		return this;
	}

	build(): string[] {
		if (!this.inputPath) {
			throw new Error(MESSAGE.ERROR.FFMPEG.NO_INPUT);
		}

		const args = ['-i', this.inputPath];

		this.options.forEach((value, key) => {
			args.push(key);
			args.push(value);
		});

		args.push(this.outputPath);

		return args;
	}
}
