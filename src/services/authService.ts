import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authService = {
    register: async (firstName: string, lastName: string, password: string) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return prisma.user.create({
            data: {
                firstName,
                lastName,
                password: hashedPassword,
            },
        });
    },

    login: async (firstName: string, lastName: string, password: string) => {
        const user = await prisma.user.findFirst({
            where: {
                AND: [
                    { firstName: firstName },
                    { lastName: lastName }
                ]
            }
        });

        if (!user) {
            throw new Error('User not found');
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        const session = await prisma.session.create({
            data: {
                token,
                userId: user.id
            }
        });

        return { token, user };
    },

    verifySession: async (token: string) => {
        try {
            const session = await prisma.session.findFirst({
                where: { token }
            });

            if (!session) {
                throw new Error('Session not found');
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            return { valid: true, decoded };
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                return { valid: false, error: 'Token expired' };
            }
            return { valid: false, error: 'Token invalid' };
        }
    },

    logout: async (token: string) => {
        await prisma.session.deleteMany({
            where: { token }
        });
    }
};
