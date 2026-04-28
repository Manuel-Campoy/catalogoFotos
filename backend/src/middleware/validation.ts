import { Request, Response, NextFunction } from 'express';
import { LoginRequest, RegisterRequest, CreateVendorRequest, CreateReviewRequest } from '../types/api';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body as LoginRequest;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Contraseña debe tener al menos 6 caracteres' });
  }
  
  next();
};

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body as RegisterRequest;
  
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña requeridos' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Contraseña debe tener al menos 6 caracteres' });
  }
  
  next();
};

export const validateCreateVendor = (req: Request, res: Response, next: NextFunction) => {
  const { name, category, city, description, contact, startPrice } = req.body as CreateVendorRequest;
  
  if (!name || !category || !city || !description || !contact) {
    return res.status(400).json({ error: 'Campos requeridos faltantes' });
  }
  if (typeof startPrice !== 'number' || startPrice < 0) {
    return res.status(400).json({ error: 'Precio inicial debe ser un número positivo' });
  }
  
  next();
};

export const validateCreateReview = (req: Request, res: Response, next: NextFunction) => {
  const { rating, text } = req.body as CreateReviewRequest;
  
  if (!rating || !text) {
    return res.status(400).json({ error: 'Rating y texto requeridos' });
  }
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating debe estar entre 1 y 5' });
  }
  
  next();
};