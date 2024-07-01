import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/authService';

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

    const { valid, error, decoded } = await authService.verifySession(token);
    
    if (!valid) {
        if (error === 'Token expired') {
            return res.status(401).json({ error: 'Token expired' });
        } else {
            return res.status(401).json({ error: 'Token invalid' });
        }
    }

    req.userId = (decoded as any).userId;
    if (req.userId === undefined) {
        return res.status(401).json({ error: 'User ID missing in token' });
    }

    next();
};
