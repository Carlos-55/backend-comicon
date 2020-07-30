import { General } from "./General.entity";
import { BeforeCreate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Is, Table } from 'sequelize-typescript';
import moment = require('moment');
import { User } from "./User.entity";

export enum CategoryImage{
	profile = 'Perfil',
	publication = 'Publicacion', 
}

// @DefaultScope(() => ({
//     include : [
//         {
//             model: User,
//             required:false
//         }
//     ]
// }))
@Table({
	paranoid: true,
	timestamps: true,
	underscored: true
})
export class Image extends General<Image>{


    @Column({
        allowNull: false,
        get() {
            return moment(this.getDataValue('dayOfBirth')).format('DD/MM/YYYY');
        }
    })
    dateImage: Date;

    @Column({ type: DataType.STRING(255), allowNull: true})
    description: string;

    @Column({ type: DataType.ENUM('Perfil','Publicacion'), allowNull: false })
	category: 'Perfil'|'Publicacion'

    @Column({ type: DataType.STRING(200), allowNull: false,
        get(){
           return  `${process.env.HOST_COMPLETE}/uploads/images/${this.getDataValue('photo')}` || ''; 
       } }) 
   photo?: string;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    id_user: number;

    @BelongsTo(() => User)
    user: User;

}