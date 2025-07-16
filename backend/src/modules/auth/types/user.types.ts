import { Prisma } from '@prisma/client';
import { SafeAuthUser } from './auth.types';

export const USER_WITH_SCHOOL_INCLUDE = {
  school: {
    select: {
      id: true,
      name: true,
      isActive: true,
    },
  },
} as const;

// Ortak tip tanımı
export type UserWithSchool = Prisma.UsersGetPayload<{
  include: typeof USER_WITH_SCHOOL_INCLUDE;
}>;

export type SafeUserWithSchool = Omit<UserWithSchool, 'passwordHash'>;

export type CurrentUserType = (Express.User & SafeAuthUser) | null;
