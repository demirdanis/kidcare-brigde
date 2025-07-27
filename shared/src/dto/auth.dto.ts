import { IsEmail, IsString, MinLength } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "./baseResponse.dto";
import { UserDto } from "./user.dto";

export class AuthDto {
  @ApiProperty({ description: "JWT access token" })
  access_token!: string;

  @ApiProperty({ description: "Token type" })
  token_type: string = "Bearer";

  @ApiProperty({ description: "Token expiration time in seconds" })
  expires_in!: number;

  @ApiProperty({ type: UserDto })
  user!: UserDto;
}

export class AuthResponseDto extends BaseResponseDto<AuthDto> {}

export class AuthRequestDto {
  @ApiProperty({
    example: "veli1@gunesanaokulu.com",
    description: "User email address",
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
  })
  @IsString()
  @MinLength(6)
  password!: string;
}
