import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ReviewService } from '../services/reviewService';
import { CreateReviewRequest } from '../types/api';

export class ReviewController {
  static async createReview(req: AuthRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const data = req.body as CreateReviewRequest;
      const review = await ReviewService.createReview(req.userId!, parseInt(vendorId as string), data);
      res.status(201).json({ succes: true, data: review });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async getVendorReviews(req: AuthRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const reviews = await ReviewService.getVendorReviews(parseInt(vendorId as string));
      res.json({ succes: true, data: reviews });
    } catch (error: any) {
      res.status(500).json({ succes: false, error: error.message });
    }
  }

  static async deleteReview(req: AuthRequest, res: Response) {
    try {
      const { reviewId } = req.params;
      const result = await ReviewService.deleteReview(req.userId!, parseInt(reviewId as string));
      res.json({ succes: true, data: result });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }
}