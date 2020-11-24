import { Pubication } from '../../entities/Publication.entity';

export const pubicationsProviders = [
	{
		provide: 'PUBLICATIONS_REPOSITORY',
		useValue: Pubication,
	},
];
