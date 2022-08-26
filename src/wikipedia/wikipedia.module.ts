import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { WikipediaService } from './wikipedia.service';

@Module({
  imports: [CacheModule.register(), HttpModule],
  providers: [WikipediaService],
  exports: [WikipediaService],
})
export class WikipediaModule {}
