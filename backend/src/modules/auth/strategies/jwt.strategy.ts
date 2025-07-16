import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types/jwt.types';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from '../../../database/prisma/prisma.service';
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

  async validate(payload: JwtPayload) {
    const user = await this.prisma.users.findUnique({
      where: {
        id: payload.user_id,
        isActive: true,
      },
      include: USER_WITH_SCHOOL_INCLUDE,
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    if (!user.school?.isActive) {
      throw new UnauthorizedException('School is inactive');
    }

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      roleId: user.roleId,
      schoolId: user.schoolId,
      school: user.school,
      lastLogin: user.lastLogin,
    };
  }
}
