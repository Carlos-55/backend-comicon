import { Message } from './Message.entity';
import { Pubication } from './Publication.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeCreate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Is, Table, HasMany } from 'sequelize-typescript';
import { General } from './General.entity';
import moment = require('moment');
import { Image } from './images.entity';
/**
 * Entity user
 */
@DefaultScope(() => ({
	include: [
		{
			model: Image,
			required: false
		},
		// {
		// 	model: Pubication,
		// 	required: false
		// }
	]
}))
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class User extends General<User> {
	@Column({ type: DataType.STRING(50), allowNull: false })
	name?: string;

	@Column({ type: DataType.STRING(50), allowNull: false })
	paternSurname: string;

	@Column({ type: DataType.STRING(50), allowNull: false })
	maternSurname: string;

	@Column({
        allowNull: false,
        get() {
            return moment(this.getDataValue('birthdate')).format('YYYY/MM/DD');
        }
    })
	birthdate: Date;

	@Is(async function Unique(value: string) {
		let user = await User.findOne({ where: { email: value }, attributes: ['id'] })
		if (user && user.id != this.id) throw new Error('validations.users.email_already_exist');
	})
	@Column({ type: DataType.STRING(50), allowNull: false })
	email?: string;

	@Column({ type: DataType.STRING, allowNull: false })
	cellphone: string;

	@Column({ type: DataType.STRING(150), allowNull:false})
	password?: string;


    // @Column({ type: DataType.STRING(200), allowNull: true,
    //     get(){
    //        return  `${process.env.HOST_COMPLETE}/uploads/images/${this.getDataValue('photo')}` || '';
    //    } })
	  // photo?: string;
	@HasMany(() => Pubication)
	publication: Pubication[];

	@HasMany(() => Image)
	images: Image[];

	@HasMany(() => Message, 'from_id')
	messagesSend: Message[];

	@BeforeCreate
	static async setPassword(instance: User) {
		instance.password = await bcrypt.hashSync(instance.password, 10);
	}
	async comparePassword(compare: string) {
		return await bcrypt.compareSync(compare, this.password);
	}
}

