import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { UserPostReviewService } from './userpostreview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { ReviewController } from 'src/userpostreview/review.controller';
import { ReviewEntity } from 'src/entities/review.entity';
import { jwtConfig } from '../jwt/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserInfoEntity } from '../entities/userinfo.entity';
@Module({
  controllers: [PostController,ReviewController],
  providers: [UserPostReviewService],
  imports: [  
    TypeOrmModule.forFeature([PostEntity, ReviewEntity, UserInfoEntity]),
    JwtModule.register({ 
      secret: jwtConfig.secret,
    }),
  ],
})
export class UserPostReviewModule {
}
