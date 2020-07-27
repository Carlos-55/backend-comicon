import { Inject, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';

import { ConfigService } from '../../config/config.service';
import { Logger } from '../../entities/Logger.entity';
import { GateLoggerGateway } from './gate-logger.gateway';

@Injectable()
export class LoggerService {
	constructor(
		@Inject('LOGGERS_REPOSITORY') private readonly repLog: typeof Logger,
		private readonly _config: ConfigService,
		private readonly _gateLog: GateLoggerGateway,
	) { }

	async getLogs() {
		return await this.repLog.findAll({ limit: 1000 });
	}

	async addLoggerInterceptor(
		{ method, url }: Request,
		now: number,
		wheree: string,
		type: TypeLogger,
		result: object,
	): Promise<any> {
		const logger = await this.repLog.create({
			url,
			type,
			now,
			wheree,
			method,
			result: JSON.stringify(result),
		});
		if (this._config.get('LOGS_WRITE')) {
			this.writeLogger(logger);
		}
		this._gateLog.sendLog(await logger._toString());
		return await logger._toString();
	}
	async writeLogger(logger: Logger) {
		const date = moment().format('DD-MM-YYYY');
		const url = path.join(
			__dirname,
			'../../../',
			this._config.get('URL_LOGS'),
			`${date}-logging.log`,
		);
		fs.appendFile(
			url,
			`[${moment(logger.createdAt).format('DD-MM-YYYY HH:MM:SS')}] [${
			logger.wheree
			}] ${logger._toString()}` + '\n',
			(error) => {
				if (error) {
					console.log('Error al escribir el log');
					console.log(error);
					return false;
				}
				return true;
			},
		);
	}
}
export type TypeLogger = 'REQUEST' | 'RESPONSE' | 'ERROR' | 'SERVICE';
