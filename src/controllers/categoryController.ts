import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export const categoryController = {
    getAllCategories: async (req: Request, res: Response) => {
        try {
            const categories = await categoryService.getAllCategories();
            res.json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch categories' });
        }
    },

    createCategory: async (req: Request, res: Response) => {
        try {
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({ error: 'Description is required' });
            }

            const category = await categoryService.createCategory({ description });
            res.json(category);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    },
};
