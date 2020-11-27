import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { MessageDTO } from './message.dto';
import { MessageService } from './message.service';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserRequest } from '../../decorators/User.decoraton';
import * as sequelize from 'sequelize'
import { Message } from '../../entities/Message.entity';
import { MessageGateway } from './message.gateway';

/**
 * Controller api rol
 */
// @UseGuards(AuthGua   rd('jwt'))

@ApiUseTags('Messages')
@Controller('messages')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class MessageController {

	constructor(readonly messages: MessageService, readonly users: UserService, private readonly gateMessages: MessageGateway) {
	}
	@Get('users')
	async getAllUsers(@UserRequest('id') id: number) {
		let data = await this.users.getAll({
			attributes: [
				'id',
				'name',
				'paternSurname',
				'maternSurname',
				[sequelize.fn('COUNT', sequelize.col('messagesSend.id')),'messages' ]
			],
			where: { [sequelize.Op.not]: { id } },
			include: [
				{
					model: Message,
					required: false,
					where: { toId: id, is_read: null },
					attributes: []
				}
			],
			group: ['id']
		})
		// console.log(data)
		return data
		// 	.reduce((before: any, after: any) => {
		// 			console.log('beforee ======>',before,  ' After ====>' ,after)
		// 		return { ...before, user: [after]}
		// 	},
		// {})
	}
	// @Get(':id')
	// async getById(@Param('id') id: number) {
	// 	let data = await this.messages.getOne(id)
	// 	return data
	// }
	@Get('conversation/:idUser')
	async getByConversation(@Param('idUser') toId: number, @UserRequest('id') fromId: number) {
		let data = await this.messages.getAll({
			where: {
				[sequelize.Op.or]: [
					{
						fromId,
						toId
					},
					{
						fromId: toId,
						toId: fromId
					}
				]
			},
			order: [['createdAt', 'ASC']]
		})
		console.log(data)
		return data
	}

	@Post()
	async create(@Body() message: MessageDTO, @UserRequest('id') fromId: number) {
		console.log(message, fromId)
		let data = await this.messages.create({ ...message, fromId })
		this.gateMessages.server.emit(`new/${message.toId}`, data);
		return data
	}
	@Put('is-read')
	async updateStatus(@UserRequest('id') fromId: number) {
		let data = await this.messages.updateStatus(fromId)
		this.gateMessages.server.emit(`status/${data.toId == fromId ? data.fromId : data.toId}`, data)
		return data
	}
	// @Delete(':id')
	// async delete(@Param('id') id: number) {
	// 	let data = await this.messages.delete(id)
	// 	return data
	// }
}
