import { Controller, UseGuards, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeacherService } from './teacher.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CurrentUserType } from '../../common/types/user.types';
import { TeacherClassesResponseDto } from '../../../../shared/src/dto/teacherClasses.dto';

@ApiTags('Teacher')
@Controller('teacher')
export class TeacherController {
  constructor(private teacherService: TeacherService) {}

  @Get('classes')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get teacher classes' })
  @ApiResponse({
    status: 200,
    description: 'Teacher classes retrieved successfully',
    type: TeacherClassesResponseDto,
  })
  async getClasses(@CurrentUser() user: CurrentUserType) {
    return await this.teacherService.getClasses(user);
  }
}
