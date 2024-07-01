import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const activityService = {
    getAllActivities: async () => {
        return prisma.activity.findMany();
    },

    getByUserActivities: async (userId: number) => {
        return prisma.activity.findMany({
            where: {
                userId: userId,
            },
            include: {
                category: true,
            },
        });
    },

    createActivity: async (data: { description: string, dtInitial: Date, dtFinal: Date, categoryId: number, userId: number }) => {
        return prisma.activity.create({
            data,
        });
    },

    updateActivity: async (id: number, data: { description?: string, dtInitial?: Date, dtFinal?: Date, categoryId?: number }) => {
        return prisma.activity.update({
            where: { id },
            data,
            include: {
                category: true,
            },
        });
    },

    deleteActivity: async (id: number) => {
        return prisma.activity.delete({
            where: { id },
        });
    },
};
