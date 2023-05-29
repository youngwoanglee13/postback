import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from './auth.service';
import { jwtConfig } from '../jwt/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { UserPostReviewService } from 'src/userpostreview/userpostreview.service';
import { UserInfoEntity } from 'src/entities/userinfo.entity';
import { ReviewEntity } from 'src/entities/review.entity';
import { PostEntity } from 'src/entities/post.entity';
@Module({
  controllers: [AuthController],
  providers: [AuthService, UserPostReviewService],
  imports: [  
    TypeOrmModule.forFeature([UserEntity, UserInfoEntity, ReviewEntity, PostEntity]),
    JwtModule.register({ 
      secret: jwtConfig.secret,
    }),
  ],
})
export class AuthModule {
}
