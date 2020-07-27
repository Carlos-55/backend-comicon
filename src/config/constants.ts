import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid/v4';

export const API_URL: string = 'http://192.168.1.70:3000/api';
export type Uploads = 'images' | 'pdfs' | 'xlsx';

/**
 * Generates storage multer
 * @param [type] url file type
 * @param [maxSize] file size in megabites
 * @returns  config to disk storage
 */
export const generateStorageMulter = (
	type: Uploads = 'images',
	maxSize: number = 3,
) => ({
	storage: diskStorage({
		destination: `./public/uploads/${type}`,
		filename: (req, file, cb) => {
			return cb(null, `${uuid()}${extname(file.originalname)}`);
		},
	}),
	limits: {
		fileSize: maxSize * 1024 * 1024,
	},
});
/**
 * Generates password
 * @param size
 * @returns password
 */
export function generatePassword(size: number): string {
	let chars = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
	let password = '';
	for (let i = 0; i < size; i++) password += chars.charAt(Math.floor(Math.random() * chars.length));
	return password;
}

/**
 * Methods
 */
export enum Methods {
	GET = "GET",
	DELETE = "DELETE",
	PUT = "PUT",
	POST = "POST",
	PATCH = "PATCH",
}
// export const messageReposponse = (type: string) => {
// 	switch (type) {
// 		case Methods.GET: return `petitions.${Methods.GET}`
// 		default: return ''
// 	}
// }
