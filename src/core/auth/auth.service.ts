import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { API_URL, generatePassword } from '../../config/constants';
import { EmailsService } from '../../helpers/emails/emails.service';
import { UserService } from '../user/user.service';
import { AuthDTO } from './auth.dto';
import { RecoveryPasswordDTO } from './recovery-password.dto';
import { ResetPasswordDTO } from './reset-password.dto';

/**
 * Auth service
 */
@Injectable()
export class AuthService {
	private readonly service = 'AuthService';
	constructor(
		private readonly _users: UserService,
		private readonly _jwt: JwtService,
		private readonly _email: EmailsService,
	) { }

	/**
	 * Validates user
	 * @param { data }
	 * @returns
	 */
	async validateUser({ data }: any) {

		return await this._users.getByUser(data.email);
	}

	/**
	 * Logins auth service
	 * @param payload
	 * @returns
	 */
	async login(payload: Partial<AuthDTO>) {
		let user = await this._users.getByUser(payload.user);

		if (!user || !(await user.comparePassword(payload.password))) {
			throw new HttpException(
				{
					error: 'errors.auth.invalid_credentials',
					where: this.service + '::validateUser',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}
		let userLogged = {
			id: user.id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			name: user.name,
			paternsurname: user.paternSurname,
			maternsurname: user.maternSurname,
			birthdate: user.birthdate,
			email: user.email,
			cellphone: user.cellphone,
			user: user.user,
			password: user.password,
			//rol: user.rol
		}
		if (!user.user) {
			throw new HttpException(
				{
					error: 'errors.auth.user_locked',
					where: this.service + '::login',
				},
				HttpStatus.UNAUTHORIZED,
			);
		}

		const token = await this._jwt.sign({
			data: userLogged,
			iss: API_URL + '/auth/login',
		});
		return { token, user: userLogged };
	}
	/**
	 * Recoverys password
	 * @param payload
	 * @returns
	 */
	async recoveryPassword(payload: Partial<RecoveryPasswordDTO>) {
		const user = await this._users.getByUser(payload.email);
		let userLogged
		if (user) {
			let newPassword = await generatePassword(6)
			const password = await bcrypt.hashSync(newPassword, 10);
			await this._users.update({ password }, user.id);
			const token = await this._jwt.signAsync({
				data: user,
			});
			await this._email.sendMail(
				process.env.EMAIL_USER,
				payload.email,
				'Recuperar contraseña - plataforma de "Hoteles"',
				'text',
				await this._email.generateTemplate<any>('recovery-password', {
					password: newPassword,
					email: payload.email,
					token,
				}),
			);
			userLogged = {
				id: user.id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			name: user.name,
			paternsurname: user.paternSurname,
			maternsurname: user.maternSurname,
			birthdate: user.birthdate,
			email: user.email,
			cellphone: user.cellphone,
			user: user.user,
			password: user.password,
			//rol: user.rol
			}

		}
		return userLogged || null;
	}
	/**
	 * Changes password
	 * @param payload
	 * @param id
	 * @returns
	 */
	async changePassword(payload: Partial<ResetPasswordDTO>, id: number) {
		const user = await this._users.getOne(id);
		if (!user) {
			throw new HttpException('errors.auth.unregistered', HttpStatus.BAD_REQUEST);
		}
		if (!await user.comparePassword(payload.oldPassword)) {
			throw new HttpException('errors.auth.password_not_same_previous', HttpStatus.BAD_REQUEST);
		}
		if (payload.newPassword != payload.repeatNewPassword) {
			throw new HttpException('errors.auth.passwords_not_same', HttpStatus.BAD_REQUEST);
		}
		const password = await bcrypt.hashSync(payload.newPassword, 10);
		await this._users.update({ password }, user.id);
		let userLogged = {
			id: user.id,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
			name: user.name,
			paternsurname: user.paternSurname,
			maternsurname: user.maternSurname,
			birthdate: user.birthdate,
			email: user.email,
			cellphone: user.cellphone,
			user: user.user,
			password: user.password,
			//rol: user.rol
		}
		return userLogged;
	}
}
