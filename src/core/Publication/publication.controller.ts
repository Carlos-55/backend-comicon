import { User } from './../../entities/user.entity';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { ApiUseTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { Pubication } from '../../entities/Publication.entity';
import { PublicationDTO } from './publication.dto';
import { PublicationService } from './publication.service';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter, generateStorageUser } from '../../config/constants';
import { UserRequest } from '../../decorators/User.decoraton';
/**
 * Controller users
 */
@ApiUseTags('Publication')
@Controller('publication')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class PublicationController {
	attributes = [
		'id',
		'datePublic',
		'description',
		// 'category',
		'evidencie'
	];
	constructor(private readonly publications: PublicationService) {}
	/**
	 * Gets all
	 * @returns all
	 */
	@Get()
	async getAll(): Promise<Pubication[]> {
		let data = await this.publications.getAll({attributes:this.attributes});
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
	async getById(@Param('id') id: number): Promise<Pubication> {
		return await this.publications.getOne(id, { attributes: this.attributes });
	}


	@Post()
		@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('evidencie', 1, generateStorageMulter('images'),
		)
	)
	async create(@Body() publicationDTO: PublicationDTO,  @UploadedFiles() evidencie, @UserRequest() user:any): Promise<Pubication> {
		if (evidencie === undefined) {
			publicationDTO.evidencie = "";
			return await this.publications.create({...publicationDTO, id_user: user.id});
		}
		publicationDTO.evidencie = evidencie[0] ? evidencie[0].filename : null
		return await this.publications.create({...publicationDTO, id_user: user.id});
	}


	@Put(':id')
	@ApiConsumes('multipart/form-data')
	@UseInterceptors(
		FilesInterceptor('evidencie', 1, generateStorageMulter('images'),
		)
	)
	async update(@Body() publicationDTO: PublicationDTO,@Param('id') id: number, @UploadedFiles() photo): Promise<Pubication> {
		if (photo === undefined) {
			publicationDTO.evidencie = "";
			return await this.publications.update(publicationDTO, id);
		}
		publicationDTO.evidencie = photo[0] ? photo[0].filename : null
		return await this.publications.update(publicationDTO, id);
	}
	/**
	 * Deletes user controller
	 * @param id
	 * @returns delete
	 */
	@Delete(':id')
	async delete(@Param('id') id: number): Promise<number> {
		return await this.publications.delete(id);
	}
}
