import { Prisma } from '@prisma/client';
import { USER_WITH_SCHOOL_INCLUDE } from './user.types';

export type AuthUserFromDB = Prisma.UsersGetPayload<{
  include: typeof USER_WITH_SCHOOL_INCLUDE;
}>;

export type SafeAuthUser = Omit<AuthUserFromDB, 'passwordHash'>;
