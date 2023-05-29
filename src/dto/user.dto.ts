import { UserInfoDTO } from "./userinfo.dto";

export class UserDTO {
    name: string;
    email: string;
    password: string;
    role: string;
    userInfo: UserInfoDTO;
}

