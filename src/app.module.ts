import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IntroductionModule } from './introduction/introduction.module';
import { WikipediaModule } from './wikipedia/wikipedia.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    IntroductionModule,
    WikipediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
