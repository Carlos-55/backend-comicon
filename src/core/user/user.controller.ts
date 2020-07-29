import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { User } from '../../entities/User.entity';
import { UserDTO } from './user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter, generateStorageUser } from '../../config/constants';
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
		'password',
		'photo'
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
	@UseGuards(AuthGuard('jwt'))
	@ApiBearerAuth()
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
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('photo', 1, generateStorageMulter('images'),
		)
	)
	async update(@Body() user: UserDTO,@Param('id') id: number, @UploadedFiles() photo): Promise<User> {
		console.log(user, '=====', photo);
		if (photo === undefined) {
			user.photo = "";
			return await this.users.update(user, id);
		}
		user.photo = photo[0] ? photo[0].filename : null
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
