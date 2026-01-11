import { Injectable } from '@nestjs/common';
import { PlaywrightCrawler } from 'crawlee';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ScrapeService {
  constructor(private prisma: PrismaService) {}

  private makeSlug(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  // 1) Scrape + Save to DB
  async scrapeNavigation() {
    let result: { title: string; url: string; slug: string }[] = [];

    const crawler = new PlaywrightCrawler({
      requestHandler: async ({ page }) => {
        await page.goto('https://www.worldofbooks.com/', {
          waitUntil: 'domcontentloaded',
        });

        const rawNav = await page.$$eval('nav a', (els) =>
          els.map((e) => ({
            title: e.textContent?.trim() || '',
            url: e.getAttribute('href') || '',
          })),
        );

        const filtered = rawNav.filter((e) => e.title && e.url);
        const uniqueMap = new Map<string, any>();

        for (const item of filtered) {
          const fullUrl = item.url.startsWith('http')
            ? item.url
            : `https://www.worldofbooks.com${item.url}`;

          const slug =
            item.url.split('/').filter(Boolean).pop() ||
            this.makeSlug(item.title);

          uniqueMap.set(slug, {
            title: item.title,
            url: fullUrl,
            slug,
          });
        }

        result = Array.from(uniqueMap.values());
      },
    });

    await crawler.run(['https://www.worldofbooks.com/']);

    // Save to DB using upsert
    for (const item of result) {
      await this.prisma.navigation.upsert({
        where: { slug: item.slug },
        update: {
          title: item.title,
          lastScrapedAt: new Date(),
        },
        create: {
          title: item.title,
          slug: item.slug,
          lastScrapedAt: new Date(),
        },
      });
    }

    return result;
  }

  // 2) Read from DB only
  async getNavigationFromDB() {
    return this.prisma.navigation.findMany({
      orderBy: { lastScrapedAt: 'desc' },
    });
  }
}
