import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseErrorDto {
  @ApiProperty({ description: "Error message" })
  message?: string;

  @ApiProperty({ description: "Error code", example: "VALIDATION_ERROR" })
  code?: string;
}

export abstract class BaseResponseDto<T> {
  @ApiProperty({
    description: "Response data",
    required: false,
  })
  data?: T;

  @ApiProperty({
    description: "Error information",
    type: [BaseResponseErrorDto],
    required: false,
  })
  errors?: BaseResponseErrorDto[];

  @ApiProperty({
    description: "Success status",
    example: true,
  })
  success!: boolean;
}
