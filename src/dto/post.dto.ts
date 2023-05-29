import { UserInfoDTO } from './userinfo.dto';
import { ReviewDTO } from './review.dto';
export class PostDTO {
    description: string;
    userinfo: UserInfoDTO;
    reviews: ReviewDTO[];
}
