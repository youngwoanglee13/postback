import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/user.entity';
import { UserInfoEntity } from 'src/entities/userinfo.entity';
import { UserPostReviewService } from 'src/userpostreview/userpostreview.service';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private postReviewService : UserPostReviewService) {}
    @Post('/signup')
    async singUp(@Body('email') email: string,@Body('name') name: string, @Body('password') password: string,@Res() res ) {
        const newUser = new UserEntity();
        newUser.role = "user";
        newUser.password = password;
        newUser.email = email; 
        newUser.name = name;
        const info = new UserInfoEntity();
        info.name = name;

        newUser.userInfo = info;
        const token = await this.authService.signUp(newUser);
   
        return res.status(201).header('authorization', token).send();
    }
    @Post('/signin')
    async login(@Body('email') email: string, @Body('password') password: string,@Res() res){
        const token = await this.authService.signIn(email, password);
        return res.status(200).header('authorization', token).send();
    }
    @Get('/all')
    async getAllUsers(): Promise<UserEntity[]> {
        return await this.authService.getAllUsers();
    }
}
