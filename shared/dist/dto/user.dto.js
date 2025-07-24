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
exports.UserResponseDto = exports.UserDto = void 0;
const api_property_1 = require("../decorators/api-property");
const baseResponse_dto_1 = require("./baseResponse.dto");
class UserDto {
}
exports.UserDto = UserDto;
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "id", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "roleId", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDto.prototype, "schoolId", void 0);
__decorate([
    (0, api_property_1.ApiProperty)(),
    __metadata("design:type", Object)
], UserDto.prototype, "school", void 0);
class UserResponseDto extends baseResponse_dto_1.BaseResponseDto {
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, api_property_1.ApiProperty)({
        description: "User response data",
        type: () => UserDto,
    }),
    __metadata("design:type", UserDto)
], UserResponseDto.prototype, "data", void 0);
