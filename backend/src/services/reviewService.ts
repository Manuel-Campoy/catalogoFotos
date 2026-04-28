import { prisma } from '../config/database';
import { CreateReviewRequest } from '../types/api';

export class ReviewService {
  static async createReview(userId: number, vendorId: number, data: CreateReviewRequest) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new Error('Vendedor no encontrado');
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        vendorId_userId: { vendorId, userId },
      },
    });

    if (existingReview) {
      throw new Error('Ya has dejado una reseña para este vendedor');
    }

    const review = await prisma.review.create({
      data: {
        vendorId,
        userId,
        packageName: data.packageName,
        rating: data.rating,
        text: data.text,
      },
      include: { user: { select: { name: true, avatar: true } } },
    });

    const reviews = await prisma.review.findMany({
      where: { vendorId },
    });

    const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await prisma.vendor.update({
      where: { id: vendorId },
      data: { rating: averageRating },
    });

    return review;
  }

  static async getVendorReviews(vendorId: number) {
    const reviews = await prisma.review.findMany({
      where: { vendorId },
      include: { user: { select: { name: true, avatar: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  }

  static async deleteReview(userId: number, reviewId: number) {
    const review = await prisma.review.findUnique({
      where: { id: reviewId },
    });

    if (!review || review.userId !== userId) {
      throw new Error('No tiene permiso para eliminar esta reseña');
    }

    await prisma.review.delete({
      where: { id: reviewId },
    });

    const reviews = await prisma.review.findMany({
      where: { vendorId: review.vendorId },
    });

    const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    await prisma.vendor.update({
      where: { id: review.vendorId },
      data: { rating: averageRating },
    });

    return { message: 'Reseña eliminada' };
  }
}