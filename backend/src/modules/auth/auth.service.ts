import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import { AuthDto, AuthResponseDto, IJwtPayload } from 'kidcare-bridge-shared';
import { Injectable, Logger } from '@nestjs/common';
import {
  SafeUserWithSchool,
  USER_WITH_SCHOOL_INCLUDE,
} from '../../common/types/user.types';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { Response } from 'express';
import { getRoleHasuraKeyById } from '../../common/utils/role.utils';
import { prepareErrorResponse } from '../../utils/error.utils';
import { prepareSuccessResponse } from '../../utils/succes.utils';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<SafeUserWithSchool | null> {
    try {
      const newHash = await bcrypt.hash('test', 12);
      console.log('newHash', newHash);
      const user = await this.prisma.users.findUnique({
        where: {
          email,
          is_active: true,
        },

        include: USER_WITH_SCHOOL_INCLUDE,
      });

      if (!user) {
        this.logger.warn(`Login attempt with non-existent email: ${email}`);
        return null;
      }

      if (!user.schools?.is_active) {
        this.logger.warn(
          `Login attempt for inactive school: ${user.schools?.name}`,
        );
        return null;
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash,
      );

      if (!isPasswordValid) {
        this.logger.warn(`Invalid password attempt for user: ${email}`);
        return null;
      }

      // Update last login
      await this.prisma.users.update({
        where: { id: user.id },
        data: { last_login: new Date() },
      });

      return user;
    } catch (error) {
      this.logger.error('Error validating user:', error);
      return null;
    }
  }

  async login(loginDto: LoginDto, res: Response): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      return prepareErrorResponse('Invalid credentials');
    }

    const tokenResponse = this.generateTokenResponse(user);

    if (tokenResponse.data?.access_token) {
      res.cookie('token', tokenResponse.data.access_token, {
        domain: process.env.TOKEN_DOMAIN,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }

    return tokenResponse;
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.users.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        return prepareErrorResponse('Invalid credentials');
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

      // Create user
      const user = await this.prisma.users.create({
        data: {
          email: registerDto.email,
          password_hash: passwordHash,
          first_name: registerDto.firstName,
          last_name: registerDto.lastName,
          phone: registerDto.phone,
          role_id: registerDto.roleId,
          school_id: registerDto.schoolId,
          is_active: true,
        },
        include: USER_WITH_SCHOOL_INCLUDE,
      });

      this.logger.log(`New user registered: ${user.email}`);

      return this.generateTokenResponse(user);
    } catch (error) {
      this.logger.error('Error registering user:', error);
      throw error;
    }
  }

  async refreshToken(userId: string): Promise<AuthResponseDto> {
    const user = await this.prisma.users.findUnique({
      where: {
        id: userId,
        is_active: true,
      },
      include: USER_WITH_SCHOOL_INCLUDE,
    });

    if (!user || !user.schools?.is_active) {
      return prepareErrorResponse('Invalid credentials');
    }

    return this.generateTokenResponse(user);
  }

  private generateTokenResponse(user: SafeUserWithSchool): AuthResponseDto {
    const expiresIn = this.configService.get<string>('jwt.expiresIn', '1y');
    const access_token = this.createJwtPayloadAsync(user, expiresIn);

    return prepareSuccessResponse<AuthDto>({
      access_token,
      token_type: 'Bearer',
      expires_in: this.parseExpirationTime(expiresIn),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        roleId: user.role_id,
        schoolId: user.school_id,
        school: user.schools,
      },
    });
  }

  private createJwtPayloadAsync(
    user: SafeUserWithSchool,
    expiresIn: string,
  ): string {
    const hasuraRoleKey = getRoleHasuraKeyById(user.role_id) || '';

    const hasuraClaims = {
      'x-hasura-user-id': user.id,
      'x-hasura-email': user.email,
      'x-hasura-default-role': hasuraRoleKey,
      'x-hasura-allowed-roles': [hasuraRoleKey],
    };

    const jwtPayload: IJwtPayload = {
      user_id: user.id,
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email,
      schoolId: user.school_id,
      roles: [hasuraRoleKey],
      'https://hasura.io/jwt/claims': hasuraClaims,
    };

    return jwt.sign(
      jwtPayload,
      this.configService.get<string>('jwt.secret', '') as jwt.Secret,
      {
        expiresIn,
        algorithm: this.configService.get<string>(
          'jwt.algorithm',
          'HS256',
        ) as jwt.Algorithm,
        audience: this.configService.get<string>(
          'jwt.audience',
          'kidcare_bridge',
        ),
        issuer: this.configService.get<string>('jwt.issuer', 'kidcare_bridge'),
      } as jwt.SignOptions,
    );
  }

  private parseExpirationTime(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1));

    switch (unit) {
      case 'h':
        return value * 3600;
      case 'd':
        return value * 86400;
      case 'm':
        return value * 60;
      default:
        return 86400; // 24 hours default
    }
  }
}
