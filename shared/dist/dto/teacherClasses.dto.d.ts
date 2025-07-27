import { BaseResponseDto } from "./baseResponse.dto";
export declare class TeacherClassDto {
    id: string;
    name: string;
    img_url: string | null;
}
export declare class TeacherClassesResponseDto extends BaseResponseDto<TeacherClassDto[]> {
    data?: TeacherClassDto[];
}
