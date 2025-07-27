/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from 'kidcare-bridge-shared';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../database/prisma/prisma.service';
import { USER_WITH_SCHOOL_INCLUDE } from '../types/user.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret') || '',
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: payload.user_id,
        is_active: true,
      },
      include: USER_WITH_SCHOOL_INCLUDE,
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    if (!user.schools?.is_active) {
      throw new UnauthorizedException('School is inactive');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      roleId: user.role_id,
      schoolId: user.school_id,
      school: user.schools,
      lastLogin: user.last_login,
    };
  }
}
