import { BaseResponseDto } from "./baseResponse.dto";
import { UserDto } from "./user.dto";
export declare class AuthDto {
    access_token: string;
    token_type: string;
    expires_in: number;
    user: UserDto;
}
export declare class AuthResponseDto extends BaseResponseDto<AuthDto> {
    data?: AuthDto;
}
export declare class AuthRequestDto {
    email: string;
    password: string;
}
