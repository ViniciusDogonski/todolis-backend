import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sessionService = {
    createSession: async (data: { token: string, userId: number }) => {
        return prisma.session.create({
            data,
        });
    },

    deleteSession: async (id: number) => {
        return prisma.session.delete({
            where: { id },
        });
    },

    getSessionsByUser: async (userId: number) => {
        return prisma.session.findMany({
            where: { userId },
        });
    },
};
