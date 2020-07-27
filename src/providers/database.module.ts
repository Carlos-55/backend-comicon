import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { databaseProviders } from './database/sequelize.provider';


@Module({
	imports: [ConfigModule],
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule { }
