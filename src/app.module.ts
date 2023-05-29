import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserPostReviewModule } from './userpostreview/userpostreview.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from './entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthModule } from './auth/auth.module';
import { UserInfoEntity } from './entities/userinfo.entity';

@Module({
  imports: [
    UserPostReviewModule,
    AuthModule,
    TypeOrmModule.forRoot({ 
      type: 'mysql', 
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'perros_bd',
      synchronize: true, 
      autoLoadEntities: true,
      entities: [PostEntity, UserEntity, ReviewEntity, UserInfoEntity],  
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
