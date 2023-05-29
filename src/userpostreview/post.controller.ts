import { Controller, Delete, Get, Post, Put, UseGuards, Request, Body } from '@nestjs/common';
import { UserPostReviewService } from './userpostreview.service';
import { PostEntity } from 'src/entities/post.entity';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserInfoEntity } from 'src/entities/userinfo.entity';

@Controller('post')
export class PostController {
  constructor(private userPostReviewService: UserPostReviewService) { } 
    @Get()
    getHolaMundo(): string {
    return this.userPostReviewService.getHolaMundo();
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(@Request() request, @Body() post: PostEntity): Promise<PostEntity> {
      const userInfo = await this.userPostReviewService.getUserInfoByUserId(request.user.id);
      const newPost = new PostEntity();
      newPost.description = post.description;
      newPost.userinfo = userInfo;
      return this.userPostReviewService.createPost(newPost);
    }
    @Get('/all')
    getPosts(): Promise<PostEntity[]> {
      return this.userPostReviewService.getPosts();
    }
    @Get()
    getPost(id: number): Promise<PostEntity> {
      return this.userPostReviewService.getPost(id);
    }
    @Put()
    @UseGuards(JwtAuthGuard)
    updatePost(id: number, post: PostEntity): Promise<PostEntity> {
      return this.userPostReviewService.updatePost(id, post);
    }
    @Delete()
    @UseGuards(JwtAuthGuard)
    deletePost(id: number): Promise<any> {
      return this.userPostReviewService.deletePost(id);
    }
    @Get('/info')
    getAllinfos(): Promise<UserInfoEntity[]> {
      return this.userPostReviewService.getAllUserInfo()
    }
}
