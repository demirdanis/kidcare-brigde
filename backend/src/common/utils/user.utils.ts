import { ExecutionContext } from '@nestjs/common';
import { SafeAuthUser } from '../types/auth.types';

/**
 * ExecutionContext'ten user'ı çıkarır
 * @param ctx ExecutionContext
 * @returns SafeAuthUser | null
 */
export function extractUserFromContext(
  ctx: ExecutionContext,
): SafeAuthUser | null {
  const request = ctx
    .switchToHttp()
    .getRequest<Request & { user?: SafeAuthUser }>();

  return request.user || null;
}
