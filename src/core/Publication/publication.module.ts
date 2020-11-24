import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { PublicationController } from './publication.controller';
import { pubicationsProviders } from './publication.provider';
import { PublicationService } from './publication.service';

@Module({
	imports: [DatabaseModule, HelpersModule, ConfigModule],
	providers: [PublicationService, ...pubicationsProviders],
	controllers: [PublicationController],
	exports: [PublicationService],
})
export class PublicationModule { }
