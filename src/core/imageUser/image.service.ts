import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ConfigService } from '../../config/config.service';
import { generatePassword } from '../../config/constants';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { EmailsService } from '../../helpers/emails/emails.service';
import { ImageDTO } from './image.dto';
import { Image } from 'src/entities/images.entity';


/**
 * Injectable
 * UserService
 */
@Injectable()
export class ImageService extends SequelizeCrudService<Image, ImageDTO> {
	constructor(
		@Inject('IMAGE_REPOSITORY') readonly images: typeof Image,
		private readonly _emails: EmailsService,
		private readonly _config: ConfigService,
	) {
		super(images)
	}

}
