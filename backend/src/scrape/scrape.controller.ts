import { Controller, Get } from '@nestjs/common';
import { ScrapeService } from './scrape.service';

@Controller('api/navigation')
export class ScrapeController {
    constructor(private scrapeService: ScrapeService) { }

    @Get()
    async getNavigation() {
        return this.scrapeService.scrapeNavigation();
    }

    // Read from DB
    @Get('db')
    getFromDB() {
        return this.scrapeService.getNavigationFromDB();
    }
}