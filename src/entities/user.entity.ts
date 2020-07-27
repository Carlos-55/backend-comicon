import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BeforeCreate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Is, Table } from 'sequelize-typescript';
import { General } from './General.entity';

/**
 * Entity user
 */
@DefaultScope(() => ({
	// include: [{
	// 	model: Rol,
	// 	required: false
	// }]
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

	@Column({ type: DataType.DATE, allowNull: false })
	birthdate: Date;

	@Is(async function Unique(value: string) {
		let user = await User.findOne({ where: { email: value }, attributes: ['id'] })
		if (user && user.id != this.id) throw new Error('validations.users.email_already_exist');
	})
	@Column({ type: DataType.STRING(50), allowNull: false })
	email?: string;

	@Column({ type: DataType.STRING, allowNull: false })
	cellphone: string;

	@Column({type: DataType.STRING, allowNull:false})
	user:string;

	@Column({ type: DataType.STRING(150), allowNull:false})
	password?: string;

	/**
	 * Tipo  de roles --type  rol
	 * 1. Administrador	-> admin
	 * 2. Mecero	-->waiter
	 */
    @Column({ type: DataType.ENUM('1', '2'), allowNull: false })
	rol: 1 | 2 
	
	@BeforeCreate
	static async setPassword(instance: User) {
		instance.password = await bcrypt.hashSync(instance.password, 10);
	}
	async comparePassword(compare: string) {
		return await bcrypt.compareSync(compare, this.password);
	}
}

