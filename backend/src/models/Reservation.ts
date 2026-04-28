export interface IReservation {
  id: number;
  vendorId: number;
  userId: number;
  packageId: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  contactEmail: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}