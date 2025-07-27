import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import {
  TeacherClassDto,
  TeacherClassesResponseDto,
} from 'kidcare-bridge-shared';

import { ConfigService } from '@nestjs/config';
import { CurrentUserType } from '../../common/types/user.types';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma/prisma.service';

@Injectable()
export class TeacherService {
  private readonly logger = new Logger(TeacherService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getClasses(user: CurrentUserType): Promise<TeacherClassesResponseDto> {
    if (!user) {
      throw new ForbiddenException('User not found!');
    }

    const classes = await this.prisma.classes.findMany({
      where: {
        OR: [{ main_teacher_id: user.id }, { secondary_teacher_id: user.id }],
        is_active: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    this.logger.log(`Found ${classes.length} classes for teacher: ${user.id}`);

    const response: TeacherClassesResponseDto = {
      success: true,
      data: classes.map(
        (classItem): TeacherClassDto => ({
          id: classItem.id,
          name: classItem.name,
          img_url: classItem.img_url,
        }),
      ),
    };

    return response;
  }
}
