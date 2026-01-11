import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScrapeModule } from './scrape/scrape.module';

@Module({
  imports: [PrismaModule, ScrapeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
