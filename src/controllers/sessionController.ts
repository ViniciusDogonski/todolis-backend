import { Request, Response } from 'express';
import { sessionService } from '../services/sessionService';

export const sessionController = {
    createSession: async (req: Request, res: Response) => {
        try {
            const { token, userId } = req.body;

            if (!token || !userId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const session = await sessionService.createSession({ token, userId });
            res.json(session);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create session' });
        }
    },

    deleteSession: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const session = await sessionService.deleteSession(Number(id));
            res.json(session);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete session' });
        }
    },

    getSessionsByUser: async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;

            const sessions = await sessionService.getSessionsByUser(Number(userId));
            res.json(sessions);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch sessions' });
        }
    },
};
