import { Image } from '../../entities/images.entity';

export const imagesProviders = [
	{
		provide: 'IMAGE_REPOSITORY',
		useValue: Image,
	},
];
