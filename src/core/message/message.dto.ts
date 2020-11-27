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






