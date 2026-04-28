export interface IPackage {
  id: number;
  vendorId: number;
  name: string;
  tier: string;
  price: number;
  features: string[];
  highlighted: boolean;
  createdAt: Date;
  updatedAt: Date;
}