import { Injectable } from '@nestjs/common';
import { S3Service } from './utils/s3.service';
import { UrlShortenerUtil } from './utils/url-shortener.util';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Injectable()
export class ShortenerService {
  constructor(private readonly s3Service: S3Service) {}

  async createShortUrl(dto: CreateShortUrlDto) {
    const shortId = UrlShortenerUtil.generateShortId();
    const expirationDate = UrlShortenerUtil.calculateExpirationDate(
      dto.expirationTimeInHours,
    );

    await this.s3Service.upload(`${shortId}.json`, {
      url: dto.url,
      expirationDate: expirationDate.toISOString(),
    });

    return {
      shortUrl: `https://${process.env.HOST}/${shortId}`,
      expiresAt: expirationDate.toISOString(),
    };
  }

  async resolveShortUrl(shortId: string) {
    const data = await this.s3Service.download(`${shortId}.json`);
    if (UrlShortenerUtil.isExpired(data.expirationDate)) {
      throw new Error('URL expired');
    }
    return data.url;
  }
}
