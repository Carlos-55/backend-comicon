import { HttpModule, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { config } from 'dotenv';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { HttpErrorFilter } from './filters/http-error.filter';
import { HelpersModule } from './helpers/helpers.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { InternalizationModule } from './modules-configs/internalization/internalization.module';


/**
 * Module
 */
@Module({
	imports: [
		// multer config async for upload files
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (_config: ConfigService) => ({
				dest: path.join(__dirname, _config.get('MULTER_DEST')),
			}),
			inject: [ConfigService],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public', 'uploads'),
			renderPath: '/uploads',
			serveRoot: '/uploads'
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public', 'dist'),
			exclude: [
				'/uploads/*',
				'/api/*'
			]
		}),
		InternalizationModule.register({
			locales: ['en', 'es'],
			directory: path.resolve(__dirname, '..', 'lenguages'),
			objectNotation: true,
			updateFiles: false,
		}),
		// http config  async is for petitions type ajax
		HttpModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (_config: ConfigService) => ({
				timeout: _config.get('HTTP_TIMEOUT'),
				maxRedirects: _config.get('HTTP_MAX_REDIRECTS'),
			}),
			inject: [ConfigService],
		}),
		UserModule,
		AuthModule,
		// RolModule,
		ConfigModule,
		HelpersModule,
		// ImagesModule,
		// CategoriesImagesModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggerInterceptor,
		},
	],
})
export class AppModule {
	constructor() {
		config();
	}
}
