import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewDTO } from 'src/dto/review.dto';
import { UserInfoDTO } from 'src/dto/userinfo.dto';
import { PostEntity } from 'src/entities/post.entity';
import { ReviewEntity } from 'src/entities/review.entity';
import { UserInfoEntity } from 'src/entities/userinfo.entity';
import { Repository } from 'typeorm';
import { PostDTO } from 'src/dto/post.dto';


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
    async createPost(post: PostDTO) : Promise<PostDTO> {
        return await this.postRepository.save(post);
    }
    async getPosts(): Promise<PostDTO[]> {
        return await this.postRepository.find();
    }
    async getPost(id: number): Promise<PostDTO> {
        return await this.postRepository.findOne({ where: { id } });
    }
    async updatePost(id: number, post: PostDTO): Promise<PostDTO> {
        return await this.postRepository.update(id, post).then(() => this.getPost(id));
    }
    async deletePost(id: number): Promise<any> {
        return await this.postRepository.delete(id);
    }
    //REVIEW
    async createReview(review: ReviewDTO, idPost: number, idUser: number) : Promise<ReviewDTO> {
        const post = await this.postRepository.findOne({where: {id: idPost}});
        const userInfo = await this.userInfoRepository.findOne({where: {user: {id: idUser}}});
        review.post = post;
        review.userInfo = userInfo;
        return await this.reviewRepository.save(review);
    }
    async getReviews(): Promise<ReviewDTO[]> {
        return await this.reviewRepository.find();
    }
    async getReview(id: number): Promise<ReviewDTO> {
        return await this.reviewRepository.findOne({ where: { id } });
    }
    async updateReview(id: number, review: ReviewDTO): Promise<ReviewDTO> {
        return await this.reviewRepository.update(id, review).then(() => this.getReview(id));
    }
    async deleteReview(id: number): Promise<any> {
        return await this.reviewRepository.delete(id);
    }
    //USERINFO
    async getAllUserInfo(): Promise<UserInfoDTO[]> {
        return await this.userInfoRepository.find(); 
    }
    async getUserInfoByUserId(userId: number): Promise<UserInfoDTO> {
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