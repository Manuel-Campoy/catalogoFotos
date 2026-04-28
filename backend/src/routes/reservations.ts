import { Router } from 'express';
import { ReservationController } from '../controllers/reservationController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/vendors/:vendorId/reservations', authMiddleware, ReservationController.createReservation);
router.get('/', authMiddleware, ReservationController.getReservations);
router.patch('/:reservationId/status', authMiddleware, ReservationController.updateStatus);

export default router;