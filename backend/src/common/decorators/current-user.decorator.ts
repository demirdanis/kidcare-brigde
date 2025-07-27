import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { CurrentUserType } from '../types/user.types';
import { extractUserFromContext } from '../utils/user.utils';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): CurrentUserType => {
    return extractUserFromContext(ctx);
  },
);
