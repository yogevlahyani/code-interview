import { CacheModule, Module } from '@nestjs/common';
import { WikipediaModule } from '../wikipedia/wikipedia.module';
import { IntroductionController } from './introduction.controller';
import { IntroductionService } from './introduction.service';

@Module({
  imports: [CacheModule.register(), WikipediaModule],
  controllers: [IntroductionController],
  providers: [IntroductionService],
})
export class IntroductionModule {}
