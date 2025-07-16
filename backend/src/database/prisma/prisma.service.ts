import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log:
        process.env.NODE_ENV === 'development'
          ? ['query', 'info', 'warn', 'error']
          : ['error'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✅ Prisma connected to database');
    } catch (error) {
      this.logger.error('❌ Failed to connect to database:', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('❌ Prisma disconnected from database');
  }

  // Custom transaction wrapper with retry logic
  async safeTransaction<T>(
    fn: (prisma: PrismaClient) => Promise<T>,
  ): Promise<T> {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
      try {
        return await this.$transaction(fn, {
          maxWait: 5000,
          timeout: 10000,
        });
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          this.logger.error(
            `Transaction failed after ${maxRetries} attempts:`,
            error,
          );
          throw error;
        }

        this.logger.warn(
          `Transaction failed, retrying... (${retries}/${maxRetries})`,
        );
        await new Promise((resolve) => setTimeout(resolve, 1000 * retries));
      }
    }

    throw new Error('Transaction failed after maximum retries');
  }
}
