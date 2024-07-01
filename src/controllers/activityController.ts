import { Request, Response } from 'express';
import { activityService } from '../services/activityService';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const activityController = {
    getAllActivities: async (req: Request, res: Response) => {
        try {
            const activities = await activityService.getAllActivities();
            res.json(activities);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch activities' });
        }
    },

    createActivity: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { description, dtInitial, dtFinal, categoryId } = req.body;

            if (!description || !dtInitial || !dtFinal || !categoryId) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const userId = req.userId;
            if (userId === undefined) {
                return res.status(400).json({ error: 'User ID is missing' });
            }

            const activity = await activityService.createActivity({ description, dtInitial, dtFinal, categoryId, userId });
            res.json(activity);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create activity' });
        }
    },

    getUserActivities: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const userId = req.userId;

            if (userId === undefined) {
                return res.status(400).json({ error: 'User ID is missing' });
            }

            const activities = await activityService.getByUserActivities(userId);
            res.json(activities);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch user activities' });
        }
    },

    updateActivity: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { description, dtInitial, dtFinal, categoryId } = req.body;

            if (!id) {
                return res.status(400).json({ error: 'Activity ID is required' });
            }

            const activity = await activityService.updateActivity(Number(id), { description, dtInitial, dtFinal, categoryId });
            res.json(activity);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update activity' });
        }
    },

    deleteActivity: async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ error: 'Activity ID is required' });
            }

            await activityService.deleteActivity(Number(id));
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete activity' });
        }
    },
};
