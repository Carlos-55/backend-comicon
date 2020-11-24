import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';


/**
 * User dto
 */
export class PublicationDTO {
	id?: number

	@ApiModelProperty({ description: 'name to user DTO' })
	//@IsString({ message: 'users.name_required' })
	name?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El apellido es requerido' })
	datePublic?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El usuario es requerido' })
	description?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	//@IsString({ message: 'El usuario es requerido' })
	category?: string;

	@ApiModelProperty({ description: 'email to user DTO' })
	evidencie?: string;


	@ApiModelProperty({ description: 'email to user DTO' })
	id_user?: number;
}

