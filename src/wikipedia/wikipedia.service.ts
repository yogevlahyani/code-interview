import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { Cache } from '../decorators/cache.decorator';

export interface ArticleData {
  scrapeDate: EpochTimeStamp;
  articleName: string;
  introduction: string;
}

@Injectable()
export class WikipediaService {
  @Inject(HttpService) private readonly httpService: HttpService;

  @Cache()
  public async getArticleData(
    articleName: string,
    language = 'en',
  ): Promise<ArticleData> {
    const scrapeDate = Math.floor(+new Date() / 1000);
    const slug = encodeURIComponent(articleName.replace(' ', '_'));
    const { data } = await this.httpService.axiosRef.get(
      `https://${language}.wikipedia.org/wiki/${slug}`,
      {
        headers: {
          'Accept-Language': language,
        },
      },
    );

    const $ = cheerio.load(data);
    const introduction = $('.mw-body-content p')
      .not('.mw-empty-elt')
      .first()
      .text();

    return {
      scrapeDate,
      articleName,
      introduction,
    };
  }
}
