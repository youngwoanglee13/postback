import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfoEntity } from './userinfo.entity';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @OneToOne(() => UserInfoEntity, userInfo => userInfo.user, { cascade: true })
    @JoinColumn({ name: 'userInfoId' })
    userInfo: UserInfoEntity;
}
