import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { validateLogin, validateRegister } from '../middleware/validation';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.get('/profile', authMiddleware, AuthController.profile);

export default router;