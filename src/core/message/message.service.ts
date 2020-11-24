import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Message } from '../../entities/Message.entity';
import { MessageDTO } from './message.dto';


/**
 * Injectable Message Service
 */
@Injectable()
export class MessageService extends SequelizeCrudService<Message, MessageDTO> {
	constructor(@Inject('MESSAGES_REPOSITORY') readonly messages: typeof Message) {
		super(messages)
	}

	/**
	 * Updates sequelize crud service
	 * @param item
	 * @param id
	 * @returns update
	 */
	async updateStatus(toId: number): Promise<any> {
		let res = await this.messages.update({ isRead: new Date() }, { where: { toId } })
		return res
	}

}