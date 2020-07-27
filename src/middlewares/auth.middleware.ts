import { Injectable, NestMiddleware } from '@nestjs/common';

/**
 * Auth middleware
 */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
	/**
	 * Uses auth middleware
	 * @param req
	 * @param res
	 * @param next
	 */
	use(req: any, res: any, next: () => void) {
		next();
	}
}
