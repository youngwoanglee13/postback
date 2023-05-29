import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from './post.entity';
import { UserInfoEntity } from './userinfo.entity';
@Entity('review')
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    comment: string;
    @ManyToOne(() => UserInfoEntity, (userEntity) => userEntity.posts)
    userInfo: UserInfoEntity;
    @ManyToOne(() => PostEntity, (postEntity) => postEntity.reviews)
    post: PostEntity;   
}
