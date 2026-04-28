import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';
import { authMiddleware } from '../middleware/auth';
import { validateCreateReview } from '../middleware/validation';

const router = Router();

router.post('/vendors/:vendorId/reviews', authMiddleware, validateCreateReview, ReviewController.createReview);
router.get('/vendors/:vendorId/reviews', ReviewController.getVendorReviews);
router.delete('/reviews/:reviewId', authMiddleware, ReviewController.deleteReview);

export default router;