import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private service: CategoryService) { }

    // sab categories
    @Get()
    getAll() {
        return this.service.getAll();
    }

    // slug se category
    @Get(':slug')
    getBySlug(@Param('slug') slug: string) {
        return this.service.getBySlug(slug);
    }
}