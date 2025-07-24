import { BaseResponseDto } from "./baseResponse.dto";
export declare class UserDto {
    id?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    roleId?: string;
    schoolId?: string;
    school?: {
        id: string;
        name: string;
    };
}
export declare class UserResponseDto extends BaseResponseDto<UserDto> {
    data?: UserDto;
}
