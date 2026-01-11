import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ScrapeService } from './scrape/scrape.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
  const scrapeService = app.get(ScrapeService);
  // await scrapeService.scrapeNavigation(); -delete to work API work
}
bootstrap();
