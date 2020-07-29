import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';


/**
 * User dto
 */
export class UserDTO {
	id?: number

	@ApiModelProperty({ description: 'name to user DTO' })
	//@IsString({ message: 'users.name_required' })
	name?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El apellido es requerido' })
	paternSurname?: string;

	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El usuario es requerido' })
	maternSurname?: string;
	
	@ApiModelProperty({ description: 'user to user DTO' })
	//@IsString({ message: 'El usuario es requerido' })
	birthdate?: Date;
	
	@ApiModelProperty({ description: 'email to user DTO' })
	@IsString({ message: 'users.email_required' })
	@IsEmail({}, { message: 'users.format_invalid_email' })
	email?: string;

	@ApiModelProperty({ description: 'cellphone to user DTO' })
	//@IsNumber({}, { message: 'users.cellphone_required' })
	cellphone: string;
	
	
	@ApiModelProperty({ description: 'user to user DTO' })
	// @IsString({ message: 'El usuario es requerido' })
	user?: string;

	@ApiModelProperty({ description: 'password to user DTO' })
	// @IsString({ message: 'Contraseña requerida' })
	password?: string;

	@ApiModelProperty({ description: 'photo to user DTO' })
	photo?: string;
}

