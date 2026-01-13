import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        return this.prisma.category.findMany({
            include: {
                navigation: true,
                products: true,
            },
        });
    }

    async getBySlug(slug: string) {
        return this.prisma.category.findFirst({
            where: { name: slug },   // kyunki slug field nahi hai
            include: {
                products: true,
                navigation: true,
            },
        });
    }
}