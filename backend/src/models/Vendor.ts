import { IUserWithoutPassword } from './User';

export interface IVendor {
  id: number;
  userId: number;
  name: string;
  category: string;
  tag?: string;
  city: string;
  description: string;
  emoji?: string;
  bgColor?: string;
  verified: boolean;
  contact: string;
  startPrice: number;
  rating: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IVendorWithUser extends IVendor {
  user?: IUserWithoutPassword;
}