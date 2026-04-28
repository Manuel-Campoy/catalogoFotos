import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { env } from '../config/env';

export interface TokenPayload {
  userId: number;
  role: string;
  email?: string;
}

export class JwtUtils {
  static sign(payload: TokenPayload, options?: Partial<SignOptions>): string {
    const jwtOptions: any = {
      expiresIn: env.JWT_EXPIRES_IN,
      ...options,
    };

    return jwt.sign(payload, env.JWT_SECRET as string, jwtOptions);
  }

  static verify(token: string, options?: VerifyOptions): TokenPayload {
    try {
      return jwt.verify(token, env.JWT_SECRET as string, options) as TokenPayload;
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }

  static decode(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload | null;
    } catch {
      return null;
    }
  }

  static isExpired(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return (decoded as any).exp ? (decoded as any).exp < currentTime : false;
  }

  static generateRefreshToken(userId: number): string {
    const jwtOptions: any = {
      expiresIn: '7d',
    };
    return jwt.sign(
      { userId, type: 'refresh' },
      env.JWT_SECRET as string,
      jwtOptions
    );
  }
}