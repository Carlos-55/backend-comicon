import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsNotEmpty, IsNumber } from 'class-validator';


/**
 * image dto
 */
export class ImageDTO {
    id?: number
    @ApiModelProperty({ description: 'name to historical DTO' })
    dateImage?: Date;
    @ApiModelProperty({ description: 'name to historical DTO' })
    description?: string;
    @ApiModelProperty({ description: 'name to historical DTO' })
    category?:string;
    @ApiModelProperty({ description: 'name to historical DTO' })
    photo?: string;
    
    id_user?: number;
}

