import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  roleId: string;

  @ApiProperty()
  schoolId: string;

  @ApiProperty()
  school: {
    id: string;
    name: string;
  };
}

export class AuthResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  access_token: string;

  @ApiProperty({ description: 'Token type' })
  token_type: string = 'Bearer';

  @ApiProperty({ description: 'Token expiration time in seconds' })
  expires_in: number;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;
}
