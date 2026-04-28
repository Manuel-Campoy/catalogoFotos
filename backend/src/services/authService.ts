import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { env } from '../config/env';
import { LoginRequest, RegisterRequest, AuthResponse } from '../types/api';

export class AuthService {
  static async register(data: RegisterRequest): Promise<AuthResponse> {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: 'USER',
      },
    });

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN } as any
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  static async login(data: LoginRequest): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      env.JWT_SECRET as string,
      { expiresIn: env.JWT_EXPIRES_IN } as any
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}