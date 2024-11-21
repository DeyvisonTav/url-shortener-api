import { Controller, Post, Body, Get, Param, Res } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { Response } from 'express';

@Controller('shortener')
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @Post('create')
  async createShortUrl(@Body() dto: CreateShortUrlDto) {
    return this.shortenerService.createShortUrl(dto);
  }

  @Get(':shortId')
  async redirectShortUrl(
    @Param('shortId') shortId: string,
    @Res() res: Response,
  ) {
    try {
      const url = await this.shortenerService.resolveShortUrl(shortId);
      return res.redirect(url);
    } catch (error) {
      return res.status(410).json({ message: 'URL expired or not found.' });
    }
  }
}
