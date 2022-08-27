import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 0, // In-Memory never expires
    }),
  ],
  providers: [
    {
      provide: 'DATABASE',
      useExisting: CACHE_MANAGER,
    },
    DatabaseService,
  ],
  exports: [DatabaseService],
})
export class DatabaseModule {}
