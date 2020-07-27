import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import * as i18n from 'i18n';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoggerService } from '../helpers/logger/logger.service';


/**
 * Injectable
 */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    /**
     * Intercepts logger interceptor
     * @param context context
     * @param call$ interceptor
     * @returns intercept call$
     */
	constructor(private readonly _logger: LoggerService) { }

	/**
	 * Intercepts logger interceptor
	 * @param context
	 * @param call$
	 * @returns intercept
	 */
	intercept(context: ExecutionContext, call$: CallHandler<any>, ): Observable<any> {
		const req = context.switchToHttp().getRequest<Request>();
		const wheree = context.getClass().name + '::' + context.getHandler().name;
		const now = Date.now();
		return call$.handle().pipe(
			tap(async () => {
				Logger.log(
					await this._logger.addLoggerInterceptor(req, now, wheree, 'REQUEST', req.body),
					wheree,
				);
			}),
			map(async (data) => {
				const lang: any = req.headers['accept-language'] || process.env.LANG_DEFAULT;
				Logger.log(
					await this._logger.addLoggerInterceptor(req, now, wheree, 'RESPONSE', data),
					wheree,
				);
				let message = i18n.__({
					locale: lang,
					phrase: `petitions.${data.message || req.method}`
				}, `petitions.${data.message || req.method}`)

				return { data: data.data || data || null, message: message };
			}),
		);
	}

}
