import { promises } from 'fs';
import { dirname, isAbsolute, join, sep } from 'path';

export class FileService {
	private async isFileExists(path: string): Promise<boolean> {
		try {
			await promises.stat(path);
			return true;
		} catch {
			return false;
		}
	}

	getPath(path: string, name: string, extension: string): string {
		let normalizedPath = path;

		if (!isAbsolute(path)) {
			normalizedPath = join(__dirname, path);
		}

		return join(dirname(normalizedPath), `${sep}${name}.${extension}`);
	}

	async deleteFileIfExists(path: string): Promise<void> {
		if (await this.isFileExists(path)) {
			await promises.unlink(path);
		}
	}
}
