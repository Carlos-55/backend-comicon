import { Message } from './../../entities/Message.entity';
import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../../config/config.service';
import { Logger } from '../../entities/Logger.entity';
import { User } from '../../entities/User.entity';
import { Pubication } from '../../entities/Publication.entity';
import { Image } from '../../entities/images.entity';



/**
 * data base Provider
 */
export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async (_config: ConfigService) => {
			const sequelize = new Sequelize({
				dialect: _config.get('SEQUELIZE_TYPE'),
				host: _config.get('SEQUELIZE_HOST'),
				port: _config.get('SEQUELIZE_PORT'),
				username: _config.get('SEQUELIZE_USERNAME'),
				password: _config.get('SEQUELIZE_PASSWORD'),
				database: _config.get('SEQUELIZE_DATABASE'),
			});
			sequelize.addModels([Logger, User, Pubication, Image, Message ]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService]
	},
];
