import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import {
  SafeUserWithSchool,
  USER_WITH_SCHOOL_INCLUDE,
} from './types/user.types';

import { AuthResponseDto } from './dtos/auth-response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types/jwt.types';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { PrismaService } from '../../database/prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { getRoleHasuraKeyById } from './utils/role.utils';

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
      const user = await this.prisma.users.findUnique({
        where: {
          email,
          isActive: true,
        },
        include: USER_WITH_SCHOOL_INCLUDE,
      });

      if (!user) {
        this.logger.warn(`Login attempt with non-existent email: ${email}`);
        return null;
      }

      if (!user.school?.isActive) {
        this.logger.warn(
          `Login attempt for inactive school: ${user.school?.name}`,
        );
        return null;
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        this.logger.warn(`Invalid password attempt for user: ${email}`);
        return null;
      }

      // Update last login
      await this.prisma.users.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      });

      return user;
    } catch (error) {
      this.logger.error('Error validating user:', error);
      return null;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateTokenResponse(user);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      // Check if user already exists
      const existingUser = await this.prisma.users.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Hash password
      const saltRounds = 12;
      const passwordHash = await bcrypt.hash(registerDto.password, saltRounds);

      // Create user
      const user = await this.prisma.users.create({
        data: {
          email: registerDto.email,
          passwordHash,
          firstName: registerDto.firstName,
          lastName: registerDto.lastName,
          phone: registerDto.phone,
          roleId: registerDto.roleId,
          schoolId: registerDto.schoolId,
          isActive: true,
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
        isActive: true,
      },
      include: USER_WITH_SCHOOL_INCLUDE,
    });

    if (!user || !user.school?.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return this.generateTokenResponse(user);
  }

  private generateTokenResponse(user: SafeUserWithSchool): AuthResponseDto {
    const expiresIn = this.configService.get<string>('jwt.expiresIn', '1y');
    const access_token = this.createJwtPayloadAsync(user, expiresIn);

    return {
      access_token,
      token_type: 'Bearer',
      expires_in: this.parseExpirationTime(expiresIn),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        schoolId: user.schoolId,
        school: user.school,
      },
    };
  }

  private createJwtPayloadAsync(
    user: SafeUserWithSchool,
    expiresIn: string,
  ): string {
    const hasuraRoleKey = getRoleHasuraKeyById(user.roleId) || '';

    const hasuraClaims = {
      'x-hasura-user-id': user.id,
      'x-hasura-email': user.email,
      'x-hasura-default-role': hasuraRoleKey,
      'x-hasura-allowed-roles': [hasuraRoleKey],
    };

    const jwtPayload: JwtPayload = {
      user_id: user.id,
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      email: user.email,
      schoolId: user.schoolId,
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
