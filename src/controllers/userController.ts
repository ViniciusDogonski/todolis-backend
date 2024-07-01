import { Request, Response } from 'express';
import { userService } from '../services/userService';

export const userController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            const { firstName, lastName, password } = req.body;

            if (!firstName || !lastName || !password) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const user = await userService.createUser({ firstName, lastName, password });
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    },
};
