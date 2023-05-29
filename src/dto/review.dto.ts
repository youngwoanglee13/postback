import { PostDTO } from './post.dto';
import { UserInfoDTO } from './userinfo.dto';

export class ReviewDTO {
    comment: string;
    userInfo: UserInfoDTO;
    post: PostDTO;   
}
