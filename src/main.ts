import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as express from 'express';
import * as i18n from 'i18n';
import { join, resolve } from 'path';
import { AppModule } from './app.module';
import { ValidatorPipe } from './pipes/validator.pipe';


async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
		cors: true,
	});
	app.enableCors();
	const options = new DocumentBuilder().addBearerAuth()
		.setTitle('general')
		.setDescription('The general API description')
		.setVersion('1.0')
		.addTag('general')
		.setBasePath('/api/')
		.build();
	app.use(compression());

	app.setGlobalPrefix('api');
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);
	app.useGlobalPipes(new ValidatorPipe());
	await app.listen(process.env.PORT);
	console.log(
		`listen in port http://${process.env.HOST}:${process.env.PORT}`,
	);
}
bootstrap();
