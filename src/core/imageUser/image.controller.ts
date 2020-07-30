import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { User } from '../../entities/User.entity';
import { ImageDTO } from './image.dto';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter, generateStorageUser } from '../../config/constants';
import { description } from '@hapi/joi';
import { Image } from 'src/entities/images.entity';
/**
 * Controller users
 */
@ApiUseTags('Images')
@Controller('images')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
export class UserController {
	attributes = [
		'id',
		'dateImage',
		'description',
		'category',
		'photo',
		'id_user'
	];
	constructor(private readonly images: ImageService) {}
	/**
	 * Gets all
	 * @returns all
	 */
	@Get()
	async getAll(): Promise<Image[]> {
		let data = await this.images.getAll({ attributes: this.attributes });
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
	async getById(@Param('id') id: number): Promise<Image> {
		return await this.images.getOne(id, { attributes: this.attributes });
	}

	/**
	 * Creates user controller
	 * @param user
	 * @returns create
	 */
	@Post('create')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('photo', 1, generateStorageMulter('images'),
		)
	)
	async create(@Body() image: ImageDTO,@UploadedFiles() photo): Promise<Image> {
		console.log(image, '=====', photo);
		if (photo[0] === undefined) {
			image.photo = "";
			return await this.images.create({ ...image});
		}
		photo.forEach(async (values) => {
			await this.images.create({ ...image, photo: values.filename })
		});
		//@ts-ignore 
		return photo;
		// image.photo = photo[0] ? photo[0].filename : null
		//return await this.images.create(image);
	}

	/**
	 @Post('historical')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('evidencie', 3, generateStorageUser('images'),
		)
	)
	async createHistorical(@Body() pacient: historicalDTO, @UploadedFiles() evidencie): Promise<Historical> {
		if (evidencie[0] === undefined) {
			pacient.evidencie = "";
			return await this._historical.create({ ...pacient, name: pacient.name, pacientId: pacient.pacientId });
		}
		evidencie.forEach(async (values) => {
			await this._docs.create({ ...pacient, historicalId: pacient.historicalId, evidencie: values.filename })
		});
		//@ts-ignore 
		return evidencie;
	} 
	 */
	/**
	 * Updates user controller
	 * @param image
	 * @param id
	 * @returns update
	 */
	@Put(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('photo', 1, generateStorageMulter('images'),
		)
	)
	async update(@Body() user: ImageDTO,@Param('id') id: number, @UploadedFiles() photo): Promise<Image> {
		console.log(user, '=====', photo);
		if (photo === undefined) {
			user.photo = "";
			return await this.images.update(user, id);
		}
		user.photo = photo[0] ? photo[0].filename : null
		return await this.images.update(user, id);
	}
	/**
	 * Deletes user controller
	 * @param id
	 * @returns delete
	 */
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<number> {
		return await this.images.delete(id);
	}
}
