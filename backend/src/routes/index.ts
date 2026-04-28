import { Router } from 'express';
import authRoutes from './auth';
import vendorRoutes from './vendors';
import reviewRoutes from './reviews';
import reservationRoutes from './reservations';
import packageRoutes from './packages';

const router = Router();

router.use('/auth', authRoutes);
router.use('/vendors', vendorRoutes);
router.use('/packages', packageRoutes);
router.use('/reviews', reviewRoutes);
router.use('/reservations', reservationRoutes);

export default router;