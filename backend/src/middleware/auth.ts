import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface AuthRequest extends Request {
    userId?: number;
    userRole?: string;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: number; role: string };
        req.userId = decoded.userId;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

export const vendorOnlyMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.userRole !== 'VENDOR') {
        return res.status(403).json({ error: 'Solo vendedores pueden acceder' });
    }
    next();
};