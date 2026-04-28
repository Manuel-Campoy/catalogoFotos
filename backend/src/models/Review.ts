import { IUserWithoutPassword } from './User';

export interface IReview {
  id: number;
  vendorId: number;
  userId: number;
  packageName: string;
  rating: number;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewWithUser extends IReview {
  user?: IUserWithoutPassword;
}