import { Column, DataType, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { General } from './General.entity';
import { User } from './user.entity';


/**
 * Entity  rol
 */
@Table({
    paranoid: true,
    timestamps: true,
    underscored: true
})
export class Message extends General<Message> {
    @Column({ type: DataType.STRING(100), allowNull: false })
    message: string;

    @Column({ allowNull: true })
    isRead: Date

    @Column({ allowNull: true })
    isViewed: Date

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    fromId: number;

    @ForeignKey(() => User)
    @Column({ allowNull: false })
    toId: number;

    @BelongsTo(() => User)
    from?: User;
}


