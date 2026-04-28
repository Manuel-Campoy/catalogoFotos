export class StringUtils {
  static slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  static capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static truncate(text: string, length: number, suffix: string = '...'): string {
    if (text.length <= length) return text;
    return text.substring(0, length - suffix.length) + suffix;
  }

  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(\+?1)?\d{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
  }
}

export class ValidationUtils {
  static validateEmail(email: string): { valid: boolean; error?: string } {
    if (!email) {
      return { valid: false, error: 'Email es requerido' };
    }
    if (!StringUtils.isValidEmail(email)) {
      return { valid: false, error: 'Email inválido' };
    }
    return { valid: true };
  }

  static validatePrice(price: any): { valid: boolean; error?: string } {
    if (typeof price !== 'number') {
      return { valid: false, error: 'Precio debe ser un número' };
    }
    if (price < 0) {
      return { valid: false, error: 'Precio no puede ser negativo' };
    }
    return { valid: true };
  }

  static validateRating(rating: any): { valid: boolean; error?: string } {
    if (typeof rating !== 'number') {
      return { valid: false, error: 'Rating debe ser un número' };
    }
    if (rating < 1 || rating > 5) {
      return { valid: false, error: 'Rating debe estar entre 1 y 5' };
    }
    return { valid: true };
  }
}

export class DateUtils {
  static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  static isFutureDate(date: Date): boolean {
    return date > new Date();
  }

  static isPastDate(date: Date): boolean {
    return date < new Date();
  }

  static getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}