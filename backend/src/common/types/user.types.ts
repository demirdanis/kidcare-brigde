import { Prisma } from '@prisma/client';
import { SafeAuthUser } from './auth.types';

export const USER_WITH_SCHOOL_INCLUDE = {
  schools: {
    select: {
      id: true,
      name: true,
      is_active: true,
    },
  },
} as const;

export type UserWithSchool = Prisma.usersGetPayload<{
  include: typeof USER_WITH_SCHOOL_INCLUDE;
}>;

export type SafeUserWithSchool = Omit<UserWithSchool, 'passwordHash'>;

export type CurrentUserType = (Express.User & SafeAuthUser) | null;
