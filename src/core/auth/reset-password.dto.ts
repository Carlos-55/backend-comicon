import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Reset password dto
 */
export class ResetPasswordDTO {
	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.before_password_required' })
	oldPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.new_password_required' })
	newPassword?: string;

	@ApiModelProperty({ description: 'Password', type: 'string', })
	@IsString({ message: 'auth.repeat_new_password_required' })
	repeatNewPassword?: string;
}
