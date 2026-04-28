import { Package, Review, User, Vendor } from '@prisma/client';

export {
    User,
    UserRole,
    Vendor,
    Package,
    Review,
    Reservation,
    ReservationStatus,
} from '@prisma/client';

export type UserWithoutPassword = Omit<User, 'password'>;

export type VendorWithRelations = Vendor & {
    packages?: Package[];
    reviews?: Review[];
    user?: UserWithoutPassword;
}

export type ReviewWithUser = Review & {
    user: UserWithoutPassword;
}