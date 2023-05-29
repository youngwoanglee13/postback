import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserInfoEntity } from './userinfo.entity';
import { ReviewEntity } from './review.entity';
@Entity('post')
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    description: string;
    @ManyToOne(() => UserInfoEntity, (userEntity) => userEntity.posts)
    userinfo: UserInfoEntity;
    @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.post)
    reviews: ReviewEntity[];
}
