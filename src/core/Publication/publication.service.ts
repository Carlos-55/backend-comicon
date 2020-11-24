import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ConfigService } from '../../config/config.service';
import { generatePassword } from '../../config/constants';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Pubication } from '../../entities/Publication.entity';
import { EmailsService } from '../../helpers/emails/emails.service';
import { PublicationDTO } from './publication.dto';


/**
 * Injectable
 * UserService
 */
@Injectable()
export class PublicationService extends SequelizeCrudService<Pubication, PublicationDTO> {
	constructor(
		@Inject('PUBLICATIONS_REPOSITORY') readonly publications: typeof Pubication,
		private readonly _emails: EmailsService,
		private readonly _config: ConfigService,
	) {
		super(publications)
	}
}
