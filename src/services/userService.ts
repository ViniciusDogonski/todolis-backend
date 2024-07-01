import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
    getAllUsers: async () => {
        return prisma.user.findMany();
    },

    createUser: async (data: { firstName: string, lastName: string, password: string }) => {
        return prisma.user.create({
            data,
        });
    },
};
