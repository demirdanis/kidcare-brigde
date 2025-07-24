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
exports.AuthRequestDto = exports.AuthResponseDto = exports.AuthDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const baseResponse_dto_1 = require("./baseResponse.dto");
const user_dto_1 = require("./user.dto");
class AuthDto {
    constructor() {
        this.token_type = "Bearer";
    }
}
exports.AuthDto = AuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "JWT access token" }),
    __metadata("design:type", String)
], AuthDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Token type" }),
    __metadata("design:type", String)
], AuthDto.prototype, "token_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Token expiration time in seconds" }),
    __metadata("design:type", Number)
], AuthDto.prototype, "expires_in", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: user_dto_1.UserDto }),
    __metadata("design:type", user_dto_1.UserDto)
], AuthDto.prototype, "user", void 0);
class AuthResponseDto extends baseResponse_dto_1.BaseResponseDto {
}
exports.AuthResponseDto = AuthResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: "Auth response data",
        type: () => AuthDto,
    }),
    __metadata("design:type", AuthDto)
], AuthResponseDto.prototype, "data", void 0);
class AuthRequestDto {
}
exports.AuthRequestDto = AuthRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "veli1@gunesanaokulu.com",
        description: "User email address",
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "password123",
        description: "User password",
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], AuthRequestDto.prototype, "password", void 0);
