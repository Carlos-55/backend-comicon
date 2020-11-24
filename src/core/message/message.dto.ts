import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

/**
 * Access
 */
export class MessageDTO {
	id: number

	isRead: Date | string

	isViewed: Date | string

	@ApiModelProperty({ description: 'message to user DTO' })
	@IsString({ message: 'No a elegido un chat' })
	message?: string;

	@ApiModelProperty({ description: 'id from to module dependence' })
	// @IsNumber({}, { message: 'messages.from_required' })
	fromId?: number;

	@ApiModelProperty({ description: 'if to to module dependence' })
	@IsNumber({}, { message: 'messages.to_required' })
	toId?: number;
}
/**
 * Rol access
 */
// export class RolAccessDTO {

// 	@ApiModelProperty({ description: 'name to user DTO' })
// 	@IsString({ message: 'users.name_required' })
// 	name?: string;

// 	// @ApiModelProperty({ description: 'module to access', type: AccessDTO })
// 	// @IsNotEmpty({ message: 'roles.users_is_required' })
// 	// users: AccessDTO;

// 	// @ApiModelProperty({ description: 'module to access', type: AccessDTO })
// 	// @IsNotEmpty({ message: 'roles.roles_is_required' })
// 	// roles: AccessDTO;

// 	// @ApiModelProperty({ description: 'module to access', type: AccessDTO })
// 	// @IsNotEmpty({ message: 'roles.images_is_required' })
// 	// images: AccessDTO;

// 	// @ApiModelProperty({ description: 'module to access', type: AccessDTO })
// 	// @IsNotEmpty({ message: 'roles.categories_images_is_required' })
// 	// categoriesImages: AccessDTO;
// }
/**
 * Rol dto
 */
export class RolDTO {

	@ApiModelProperty({ description: 'name to rol', type: 'string' })
	@IsString({ message: 'roles.name_is_required' })
	name?: string;

	// @ApiModelProperty({ description: 'access assigned to rol', type: RolAccessDTO })
	// @IsNotEmpty({ message: 'roles.access_invalids' })
	// access?: RolAccessDTO;
}





