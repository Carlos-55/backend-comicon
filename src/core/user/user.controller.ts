import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { User } from '../../entities/User.entity';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';

/**
 * Controller users
 */
@ApiUseTags('Users')
@Controller('users')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
export class UserController {
	attributes = [
		'id',
		'name',
		'paternSurname',
		'maternSurname',
		'birthdate',
		'email',
		'cellphone',
		'user',
		'password',
		'rol'
	];
	constructor(private readonly users: UserService) {}
	/**
	 * Gets all
	 * @returns all
	 */
	@Get()
	async getAll(): Promise<User[]> {
		let data = await this.users.getAll({ attributes: this.attributes });
		return data;
	}

	/**
	 * Gets by id
	 * @param id
	 * @returns by id
	 */
	@Get(':id')
	async getById(@Param('id') id: number): Promise<User> {
		return await this.users.getOne(id, { attributes: this.attributes });
	}

	/**
	 * Creates user controller
	 * @param user
	 * @returns create
	 */
	@Post()
	async create(@Body() user: UserDTO): Promise<User> {
		return await this.users.createForUser(user);
	}
	/**
	 * Updates user controller
	 * @param user
	 * @param id
	 * @returns update
	 */
	@Put(':id')
	async update(
		@Body() user: UserDTO,
		@Param('id') id: number,
	): Promise<User> {
		return await this.users.update(user, id);
	}
	/**
	 * Deletes user controller
	 * @param id
	 * @returns delete
	 */
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<number> {
		return await this.users.delete(id);
	}
}
