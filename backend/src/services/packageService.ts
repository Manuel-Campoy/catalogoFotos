import { prisma } from '../config/database';

export class PackageService {
  static async createPackage(vendorId: number, userId: number, data: any) {
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.userId !== userId) {
      throw new Error('No tienes permiso para crear paquetes en este vendedor');
    }

    const pkg = await prisma.package.create({
      data: {
        vendorId,
        name: data.name,
        tier: data.tier,
        price: data.price,
        features: data.features,
        highlighted: data.highlighted || false,
      },
    });

    return pkg;
  }

  static async updatePackage(packageId: number, vendorId: number, userId: number, data: any) {
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      throw new Error('Paquete no encontrado');
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.userId !== userId) {
      throw new Error('No tienes permiso para editar este paquete');
    }

    const updated = await prisma.package.update({
      where: { id: packageId },
      data,
    });

    return updated;
  }

  static async deletePackage(packageId: number, vendorId: number, userId: number) {
    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      throw new Error('Paquete no encontrado');
    }

    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });

    if (!vendor || vendor.userId !== userId) {
      throw new Error('No tienes permiso para eliminar este paquete');
    }

    await prisma.package.delete({
      where: { id: packageId },
    });

    return { message: 'Paquete eliminado' };
  }

  static async getVendorPackages(vendorId: number) {
    const packages = await prisma.package.findMany({
      where: { vendorId },
    });

    return packages;
  }
}