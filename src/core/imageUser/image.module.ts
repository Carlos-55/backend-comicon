import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { UserController } from './image.controller';
import { imagesProviders } from './image.provider';
import { ImageService } from './image.service';

@Module({
	imports: [DatabaseModule, HelpersModule, ConfigModule],
	providers: [ImageService, ...imagesProviders],
	controllers: [UserController],
	exports: [ImageService],
})
export class ImagesModule { }
