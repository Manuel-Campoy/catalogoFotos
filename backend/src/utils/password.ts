import bcrypt from 'bcrypt';

export class PasswordUtils {
  static async hash(password: string, rounds: number = 10): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  static validate(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una mayúscula');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('La contraseña debe contener al menos una minúscula');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('La contraseña debe contener al menos un número');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static generateTemporaryPassword(length: number = 12): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}