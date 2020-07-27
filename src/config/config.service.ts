import * as Joi from '@hapi/joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * Env config
 */
export interface EnvConfig {
	[key: string]: string;
}

/**
 * Config service
 */
@Injectable()
export class ConfigService {
	private readonly envConfig: EnvConfig;

    /**
     * Creates an instance of config service.
     * @param filePath config default .env
     */
	constructor(filePath: string) {
		// console.log(filePath);

		const config = dotenv.parse(fs.readFileSync(filePath));
		this.envConfig = this.validateInput(config);
	}

    /**
     * Validates input
     * @param envConfig validadion
     * @returns input boolean
     */
	private validateInput(envConfig: EnvConfig): EnvConfig {
		const envVarsSchema: Joi.ObjectSchema = Joi.object({
			NODE_ENV: Joi.string(),
			PORT: Joi.number().default(3000),
			TOKEN_SECRET: Joi.string().required(),
			HOST: Joi.string().required(),
			HOST_COMPLETE: Joi.string().required(),
			SEQUELIZE_TYPE: Joi.string().required(),
			SEQUELIZE_HOST: Joi.string().required(),
			SEQUELIZE_PORT: Joi.number().required(),
			SEQUELIZE_USERNAME: Joi.string().required(),
			SEQUELIZE_PASSWORD: Joi.string().default(''),
			SEQUELIZE_DATABASE: Joi.string().required(),
			LANG_DEFAULT: Joi.string().required(),
			MULTER_DEST: Joi.string().required(),
			HTTP_TIMEOUT: Joi.number().default(5000),
			HTTP_MAX_REDIRECTS: Joi.number().default(5),
		});

		const { error, value: validatedEnvConfig } = envVarsSchema.validate(
			envConfig,
		);
		if (error) {
			throw new Error(`Config validation error: ${error.message}`);
		}
		return validatedEnvConfig;
	}

    /**
     * Gets config service
     * @param key config json
     * @returns get any config
     */
	get(key: string): any {
		return this.envConfig[key];
	}
}
