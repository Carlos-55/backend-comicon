import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ConfigService } from '../../config/config.service';
import { generatePassword } from '../../config/constants';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { User } from '../../entities/User.entity';
import { EmailsService } from '../../helpers/emails/emails.service';
import { UserDTO } from './user.dto';


/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends SequelizeCrudService<User, UserDTO> {
	constructor(
		@Inject('USERS_REPOSITORY') readonly users: typeof User,
		private readonly _emails: EmailsService,
		private readonly _config: ConfigService,
	) {
		super(users)
	}
	/**
	 * Gets by user
	 * @param user
	 * @returns by user
	 */
	async getByUser(user: string): Promise<User> {
		// this.users.destroy
		return await this.users.findOne({
			where: {
				[Op.or]: [
					{ email: user },
				]
			}
		})
	}
	/**
	 * Creates user service
	 * @param user
	 * @returns create
	 */
	async create(user: Partial<UserDTO>): Promise<User> {
		let password = await generatePassword(8)
		let userName = user.user ? user.user : user.name.slice(0, 3) + user.paternSurname.slice(0, 3) + generatePassword(3);
		console.log(user);
		let itemCreated = await this.users.create({ ...user })
		await this._emails.sendMail(
			this._config.get('EMAIL_USER'),
			user.email,
			'Registro en la plataforma "nueva"',
			'text',
			await this._emails.generateTemplate<any>('subscription', {
				password,
				userName
			}),
		);
		return this.getOne(itemCreated.id);
	}

	
	async createForUser(user: Partial<UserDTO>): Promise<User> {
		let itempacient = await this.users.create({ ...user});
		// await this._emails.sendMail(
		// 	this._config.get('EMAIL_USER'),
		// 	user.email,
		// 	'Registro en la plataforma "Clinica"',
		// 	'text',
		// 	await this._emails.generateTemplate<any>('subscription', {
		// 	}),
		// );
		return this.getOne(itempacient.id);
	}
}
