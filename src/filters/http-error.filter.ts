import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as i18n from "i18n";
import { SequelizeScopeError, ValidationError } from 'sequelize';
import { LoggerService } from '../helpers/logger/logger.service';


/**
 * Catch HttpErrorFilter implements ExceptionFilter
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {

    /**
     * Catch http error filter
     * @param exception Http exception
     * @param host argument host
     */
	constructor(private readonly _logger: LoggerService) { }
	async catch(exception: HttpException, host: ArgumentsHost) {

		const ctx: HttpArgumentsHost = host.switchToHttp();
		const request = ctx.getRequest<Request>();
		const response = ctx.getResponse<Response>();
		// implementacion de angular o vue o react
		// if (exception instanceof HttpException && exception.getStatus() == 404)
		// 	return response.sendFile(
		// 		join(__dirname, '../../public/dist/index.html'),
		// 	);
		const lang: any = request.headers['accept-language'] || process.env.LANG_DEFAULT;
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		// @ts-ignore
		let messages = exception.errors ? exception.errors[0].message : exception.message
		const wheree: string = exception.message.where || 'SERVER';
		const errorResponse = {
			code: status,
			timestamps: new Date().toLocaleDateString(),
			path: request.url,
			method: request.method,
			message: await this.getMessage(messages, lang),
		};
		Logger.error(
			await this._logger.addLoggerInterceptor(request, Date.now(), wheree, 'ERROR', errorResponse),
			exception.stack,
			wheree,
		);

		response.status(status).json(errorResponse);
	}
	/**
	 * Gets message
	 * @param error 
	 * @param lang 
	 * @returns  
	 */
	async getMessage(error: any, lang: string) {
		if (error && error.error) {
			return await this.translateMessage(error.error, lang)
		} else if (error) {
			return await this.translateMessage(error, lang)
		} else {
			return null
		}
	}
	/**
	 * Translates message
	 * @param message 
	 * @param lang 
	 * @returns  
	 */
	async translateMessage(message: Array<string> | string, lang: string) {

		if (message instanceof Array) {
			return message.map(messageInArray => {
				return i18n.__({
					locale: lang,
					phrase: messageInArray
				}, messageInArray)
			}).join(', ')
		} else {
			return i18n.__({
				locale: lang,
				phrase: message.trim()
			}, message)
		}
	}
}
