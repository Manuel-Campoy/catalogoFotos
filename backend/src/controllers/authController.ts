import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { AuthService } from '../services/authService';
import { LoginRequest, RegisterRequest } from '../types/api';
import { prisma } from '../config/database';

export class AuthController {
  static async register(req: AuthRequest, res: Response) {
    try {
      const data = req.body as RegisterRequest;
      const result = await AuthService.register(data);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  }

  static async login(req: AuthRequest, res: Response) {
    try {
      const data = req.body as LoginRequest;
      const result = await AuthService.login(data);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(401).json({ success: false, error: error.message });
    }
  }

  static async profile(req: AuthRequest, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          city: true,
          avatar: true,
        },
      });

      if (!user) {
        return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
      }

      res.json({ success: true, data: user });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}


