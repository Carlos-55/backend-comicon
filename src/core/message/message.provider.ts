import { Message } from '../../entities/Message.entity';

export const messagesProviders = [
	{
		provide: 'MESSAGES_REPOSITORY',
		useValue: Message,
	},
];
