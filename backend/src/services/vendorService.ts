import { prisma } from '../config/database';
import { CreateVendorRequest, VendorFilterQuery } from '../types/api';

export class VendorService {
  static async createVendor(userId: number, data: CreateVendorRequest) {
    const existingVendor = await prisma.vendor.findUnique({
      where: { userId },
    });

    if (existingVendor) {
      throw new Error('Este usuario ya tiene un perfil de vendedor');
    }

    const vendor = await prisma.vendor.create({
      data: {
        userId,
        name: data.name,
        category: data.category,
        tag: data.tag,
        city: data.city,
        description: data.description,
        emoji: data.emoji,
        bgColor: data.bgColor,
        contact: data.contact,
        startPrice: data.startPrice,
      },
      include: { user: { select: { name: true, email: true } } },
    });

    return vendor;
  }

  static async getVendors(filters?: VendorFilterQuery) {
    const where: any = { verified: true };

    if (filters?.city) where.city = filters.city;
    if (filters?.tag) where.tag = filters.tag;
    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const vendors = await prisma.vendor.findMany({
      where,
      include: {
        packages: true,
        reviews: true,
        user: { select: { name: true, email: true } },
      },
      orderBy: filters?.sort === 'rating' ? { rating: 'desc' } : { createdAt: 'desc' },
    });

    return vendors;
  }

  static async getVendorById(id: number) {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
      include: {
        packages: true,
        reviews: {
          include: { user: { select: { name: true, avatar: true } } },
        },
        user: { select: { name: true, email: true, phone: true } },
      },
    });

    if (!vendor) {
      throw new Error('Vendedor no encontrado');
    }

    return vendor;
  }

  static async updateVendor(userId: number, id: number, data: Partial<CreateVendorRequest>) {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendor || vendor.userId !== userId) {
      throw new Error('No tiene permiso para actualizar este vendedor');
    }

    const updated = await prisma.vendor.update({
      where: { id },
      data,
      include: { packages: true },
    });

    return updated;
  }

  static async deleteVendor(userId: number, id: number) {
    const vendor = await prisma.vendor.findUnique({
      where: { id },
    });

    if (!vendor || vendor.userId !== userId) {
      throw new Error('No tiene permiso para eliminar este vendedor');
    }

    await prisma.vendor.delete({
      where: { id },
    });

    return { message: 'Vendedor eliminado' };
  }
}