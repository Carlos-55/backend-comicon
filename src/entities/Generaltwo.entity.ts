import { Column, CreatedAt, DeletedAt, Model, UpdatedAt } from 'sequelize-typescript';


/**
 * General
 * @template T
 */
export class Generaltwo<T> extends Model<T> {
	/**
	 * Column  of general
	 */
	@Column({ autoIncrement: true, primaryKey: true })
	id?: number;

	/**
	 * Created at of general
	 */
	@CreatedAt
	@Column({ field: 'created_at', allowNull: false })
	createdAt?: Date;

}
