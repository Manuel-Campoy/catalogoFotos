import { prisma } from '../config/database';
import { CreateReservationRequest } from '../types/api';

export class ReservationService {
  static async createReservation(userId: number, vendorId: number, data: CreateReservationRequest) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor) {
      throw new Error('Vendedor no encontrado');
    }

    const pkg = await prisma.package.findUnique({
      where: { id: data.packageId },
    });

    if (!pkg) {
      throw new Error('Paquete no encontrado');
    }

    const reservation = await prisma.reservation.create({
      data: {
        vendorId,
        userId,
        packageId: data.packageId,
        contactEmail: data.contactEmail,
        notes: data.notes,
        status: 'PENDING',
      },
    });

    return reservation;
  }

  static async getReservations(userId: number) {
    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        vendor: { select: { name: true, contact: true } },
        package: { select: { name: true, price: true } },
      },
    });

    return reservations;
  }

  static async updateReservationStatus(userId: number, reservationId: number, status: string) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new Error('Reserva no encontrada');
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: reservation.vendorId },
    });

    if (vendor?.userId !== userId) {
      throw new Error('No tienes permiso para actualizar esta reserva');
    }

    const updated = await prisma.reservation.update({
      where: { id: reservationId },
      data: { status: status as any },
    });

    return updated;
  }
}