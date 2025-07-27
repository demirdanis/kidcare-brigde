import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseDto } from "./baseResponse.dto";

export class TeacherClassDto {
  @ApiProperty({
    description: "Class ID",
    example: "550e8400-e29b-41d4-a716-446655440000",
  })
  id!: string;

  @ApiProperty({
    description: "Class name",
    example: "Papatya Sınıfı",
  })
  name!: string;

  @ApiProperty({
    description: "Class image URL",
    example: "/images/papatya-sinifi.jpg",
    required: false,
  })
  img_url!: string | null;
}

export class TeacherClassesResponseDto extends BaseResponseDto<
  TeacherClassDto[]
> {}
