import { Logger } from '../../entities/Logger.entity';

export const loggersProviders = [
	{
		provide: 'LOGGERS_REPOSITORY',
		useValue: Logger,
	},
];
