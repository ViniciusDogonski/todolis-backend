import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authController = {
    register: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, password } = req.body;

            if (!firstName || !lastName || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const user = await authService.register(firstName, lastName, password);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register user' });
        }
    },

    login: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, password } = req.body;

            if (!firstName || !lastName || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const { token, user } = await authService.login(firstName, lastName, password);
            res.json({ token, user });
        } catch (error) {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    },

    logout: async (req: Request, res: Response) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const parts = authHeader.split(' ');

        if (parts.length !== 2) {
            return res.status(401).json({ error: 'Token error' });
        }

        const [scheme, token] = parts;

        if (!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ error: 'Token malformatted' });
        }

        await authService.logout(token);
        res.json({ message: 'Logged out successfully' });
    }
};
