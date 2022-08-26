import {
  BadRequestException,
  Controller,
  Get,
  Headers,
  Param,
} from '@nestjs/common';
import { ArticleData, WikipediaService } from '../wikipedia/wikipedia.service';

@Controller('introduction')
export class IntroductionController {
  public constructor(private readonly wikipediaService: WikipediaService) {}

  @Get(':articleName')
  public getArticle(
    @Param('articleName') articleName: string,
    @Headers('accept-language') language: string,
  ): Promise<ArticleData> {
    // Regular expression to check if string is a valid url slug
    const regexExp = /^[a-z0-9]+(?:(?:-|_)+[a-z0-9]+)*$/gm;
    const isValidSlug = regexExp.test(articleName.toLowerCase());

    if (!isValidSlug) {
      throw new BadRequestException(
        'The article name must be only letters, hyphens (-), underscores (_) and numbers.',
      );
    }

    return this.wikipediaService.getArticleData(articleName, language);
  }
}
