import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScrapeModule } from './scrape/scrape.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    PrismaModule,
    ScrapeModule,
    CategoryModule,   // 👈 ye add karna zaroori hai
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }