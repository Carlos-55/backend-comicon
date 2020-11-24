import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { MessageController } from './message.controller';
import { messagesProviders } from './message.provider';
import { MessageService } from './message.service';
import { MessageGateway } from './message.gateway';
import { UserModule } from '../user/user.module';


@Module({
	imports: [DatabaseModule, UserModule],
	providers: [MessageService, ...messagesProviders, MessageGateway],
	controllers: [MessageController],
})
export class MessageModule { }
