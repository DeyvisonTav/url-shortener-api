import { Module } from '@nestjs/common';
import { ShortenerController } from './shortener.controller';
import { ShortenerService } from './shortener.service';
import { S3Service } from './utils/s3.service';

@Module({
  imports: [],
  controllers: [ShortenerController],
  providers: [ShortenerService, S3Service],
})
export class ShortenerModule {}
