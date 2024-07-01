import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryService = {
    getAllCategories: async () => {
        return prisma.category.findMany();
    },

    createCategory: async (data: { description: string }) => {
        return prisma.category.create({
            data,
        });
    },
};
