import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { ReviewEntity } from './review.entity';
import { UserEntity } from './user.entity';
@Entity('userinfo')
export class UserInfoEntity {
    @PrimaryGeneratedColumn()
    userInfoId: number;
    @Column()
    name: string;
    @OneToMany(() => PostEntity, (postEntity) => postEntity.userinfo)
    posts: PostEntity[];
    @OneToMany(() => ReviewEntity, (reviewEntity) => reviewEntity.userInfo)
    reviews: ReviewEntity[];
    @OneToOne(() => UserEntity, user => user.userInfo)
    user: UserEntity;
}
