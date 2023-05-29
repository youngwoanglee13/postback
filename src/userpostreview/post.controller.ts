import { Controller, Delete, Get, Post, Put, UseGuards, Request, Body } from '@nestjs/common';
import { UserPostReviewService } from './userpostreview.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserInfoDTO } from 'src/dto/userinfo.dto';
import { PostDTO } from 'src/dto/post.dto';
@Controller('post')
export class PostController {
  constructor(private userPostReviewService: UserPostReviewService) { } 
    @Get()
    getHolaMundo(): string {
    return this.userPostReviewService.getHolaMundo();
    }
    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(@Request() request, @Body() post: PostDTO): Promise<PostDTO> {
      const userInfo = await this.userPostReviewService.getUserInfoByUserId(request.user.id);
      const newPost = new PostDTO();
      newPost.description = post.description;
      newPost.userinfo = userInfo;
      return this.userPostReviewService.createPost(newPost);
    }
    @Get('/all')
    getPosts(): Promise<PostDTO[]> {
      return this.userPostReviewService.getPosts();
    }
    @Get()
    getPost(id: number): Promise<PostDTO> {
      return this.userPostReviewService.getPost(id);
    }
    @Put()
    @UseGuards(JwtAuthGuard)
    updatePost(id: number, post: PostDTO): Promise<PostDTO> {
      return this.userPostReviewService.updatePost(id, post);
    }
    @Delete()
    @UseGuards(JwtAuthGuard)
    deletePost(id: number): Promise<any> {
      return this.userPostReviewService.deletePost(id);
    }
    @Get('/info') //borrar al final
    getAllinfos(): Promise<UserInfoDTO[]> {
      return this.userPostReviewService.getAllUserInfo()
    }
}
