export declare class BaseResponseErrorDto {
    message?: string;
    code?: string;
}
export declare abstract class BaseResponseDto<T> {
    data?: T;
    errors?: BaseResponseErrorDto[];
    success: boolean;
}
