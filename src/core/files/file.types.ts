export interface IFileService {
	getPath(path: string, name: string, extension: string): string;
	deleteFileIfExists(path: string): Promise<void>;
}
