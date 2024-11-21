import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  try {
    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}`,
      'Bootstrap',
    );
  } catch (error) {
    Logger.error('❌ Error starting the application', error, 'Bootstrap');
    process.exit(1);
  }
}

bootstrap();
