import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { ReviewEntity } from 'src/entities/review.entity';
import { UserInfoEntity } from 'src/entities/userinfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserPostReviewService {
    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
        @InjectRepository(UserInfoEntity) private userInfoRepository: Repository<UserInfoEntity>,
    ) {}
    getHolaMundo(): string {
        return 'Adios mundo cruel';
    }
    //POST
    async createPost(post: PostEntity) : Promise<PostEntity> {
        return await this.postRepository.save(post);
    }
    async getPosts(): Promise<PostEntity[]> {
        return await this.postRepository.find();
    }
    async getPost(id: number): Promise<PostEntity> {
        return await this.postRepository.findOne({ where: { id } });
    }
    async updatePost(id: number, post: PostEntity): Promise<PostEntity> {
        return await this.postRepository.update(id, post).then(() => this.getPost(id));
    }
    async deletePost(id: number): Promise<any> {
        return await this.postRepository.delete(id);
    }
    //REVIEW
    async createReview(review: ReviewEntity, idPost: number, idUser: number) : Promise<ReviewEntity> {
        const post = await this.postRepository.findOne({where: {id: idPost}});
        const userInfo = await this.userInfoRepository.findOne({where: {user: {id: idUser}}});
        review.post = post;
        review.userInfo = userInfo;
        return await this.reviewRepository.save(review);
    }
    async getReviews(): Promise<ReviewEntity[]> {
        return await this.reviewRepository.find();
    }
    async getReview(id: number): Promise<ReviewEntity> {
        return await this.reviewRepository.findOne({ where: { id } });
    }
    async updateReview(id: number, review: ReviewEntity): Promise<ReviewEntity> {
        return await this.reviewRepository.update(id, review).then(() => this.getReview(id));
    }
    async deleteReview(id: number): Promise<any> {
        return await this.reviewRepository.delete(id);
    }
    //USERINFO
    async getAllUserInfo(): Promise<UserInfoEntity[]> {
        return await this.userInfoRepository.find();
    }
    async getUserInfoByUserId(userId: number): Promise<UserInfoEntity> {
        const userInfo = await this.userInfoRepository.findOne({
            where: { user: { id: userId } },
          });
        if (!userInfo) {
            throw new NotFoundException('Usuario no encontradoss');
        }
        return userInfo;
    }
    async createUserInfo(userInfo: UserInfoEntity) : Promise<UserInfoEntity> {
        return await this.userInfoRepository.save(userInfo);
    }
}