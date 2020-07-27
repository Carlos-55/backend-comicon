import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Auth dto
 */
export class AuthDTO {

	/**
	 * User  of auth dto
	 */
	@ApiModelProperty({ description: 'user to login', type: 'string' })
	@IsString({ message: 'auth.user_required' })
	user?: string;

	/**
	 * Password  of auth dto
	 */
	@ApiModelProperty({ description: 'password to login', type: 'string' })
	@IsString({ message: 'auth.password_required' })
	password?: string;
}
