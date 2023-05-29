import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserPostReviewService } from 'src/userpostreview/userpostreview.service';
import { UserDTO }from 'src/dto/user.dto';
import { UserInfoDTO }from 'src/dto/userinfo.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private postReviewService : UserPostReviewService) {}
    @Post('/signup')
    async singUp(@Body('email') email: string,@Body('name') name: string, @Body('password') password: string,@Res() res ) {
        const newUser = new UserDTO();
        newUser.role = "user";
        newUser.password = password;
        newUser.email = email; 
        newUser.name = name;
        const info = new UserInfoDTO();
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
    async getAllUsers(): Promise<UserDTO[]> {
        return await this.authService.getAllUsers();
    }
}
