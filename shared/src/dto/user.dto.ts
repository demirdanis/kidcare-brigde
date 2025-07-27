import { ApiProperty } from "../decorators/api-property";
import { BaseResponseDto } from "./baseResponse.dto";

export class UserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  roleId?: string;

  @ApiProperty()
  schoolId?: string;

  @ApiProperty()
  school?: {
    id: string;
    name: string;
  };
}

export class UserResponseDto extends BaseResponseDto<UserDto> {}
