import { General } from "./General.entity";
import { BeforeCreate, BelongsTo, Column, DataType, DefaultScope, ForeignKey, Is, Table } from 'sequelize-typescript';
import moment = require('moment');
import { User } from "./User.entity";

export enum CategoryComic{
	ave = 'Aventura',
	belic = 'Bélico', 
	humo = 'Humorístico',
	costum = 'Costumbrista',
    depo = 'Deportivo',
    fanta = 'Fantástico',
    historic = 'Historico',
    police = 'Policiaco',
    romantic = 'Romántico',
    terror = 'Manga'
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
export class Pubication extends General<Pubication>{

    @Column({ type: DataType.STRING(50), allowNull: false })
	name?: string;

    @Column({
        allowNull: false,
        get() {
            return moment(this.getDataValue('dayOfBirth')).format('DD/MM/YYYY');
        }
    })
    datePublic: Date;

    @Column({ type: DataType.STRING(255), allowNull: true})
    description: string;

    @Column({ type: DataType.ENUM('Aventura','Bélico','Humorístico','Costumbrista','Deportivo','Fantástico','Historico','Policiaco','Romántico','Manga'), allowNull: false })
	category: 'Aventura'|'Bélico'|'Humorístico'|'Costumbrista'|'Deportivo'|'Fantástico'|'Historico'|'Policiaco'|'Romántico'|'Manga'

    @Column({ type: DataType.STRING(200), allowNull: false,
        get(){
           return  `${process.env.HOST_COMPLETE}/uploads/images/${this.getDataValue('evidencie')}` || ''; 
       } })
   evidencie?: string;

    @ForeignKey(() => User)
    @Column({allowNull: false})
    id_user: number;

    @BelongsTo(() => User)
    user: User;

}