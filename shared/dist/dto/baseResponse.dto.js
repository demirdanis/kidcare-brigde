"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponseDto = exports.BaseResponseErrorDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BaseResponseErrorDto {
}
exports.BaseResponseErrorDto = BaseResponseErrorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error message" }),
    __metadata("design:type", String)
], BaseResponseErrorDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Error code", example: "VALIDATION_ERROR" }),
    __metadata("design:type", String)
], BaseResponseErrorDto.prototype, "code", void 0);
class BaseResponseDto {
}
exports.BaseResponseDto = BaseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Response data",
        required: false,
    }),
    __metadata("design:type", Object)
], BaseResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Error information",
        type: [BaseResponseErrorDto],
        required: false,
    }),
    __metadata("design:type", Array)
], BaseResponseDto.prototype, "errors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Success status",
        example: true,
    }),
    __metadata("design:type", Boolean)
], BaseResponseDto.prototype, "success", void 0);
