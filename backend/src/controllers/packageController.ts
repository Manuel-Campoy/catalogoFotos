import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { PackageService } from '../services/packageService';

export class PackageController {
  static async createPackage(req: AuthRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const data = req.body;
      const pkg = await PackageService.createPackage(parseInt(vendorId as string), req.userId!, data);
      res.status(201).json({ succes: true, data: pkg });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async updatePackage(req: AuthRequest, res: Response) {
    try {
      const { vendorId, packageId } = req.params;
      const data = req.body;
      const pkg = await PackageService.updatePackage(
        parseInt(packageId as string),
        parseInt(vendorId as string),
        req.userId!,
        data
      );
      res.json({ succes: true, data: pkg });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async deletePackage(req: AuthRequest, res: Response) {
    try {
      const { vendorId, packageId } = req.params;
      const result = await PackageService.deletePackage(
        parseInt(packageId as string),
        parseInt(vendorId as string),
        req.userId!
      );
      res.json({ succes: true, data: result });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async getVendorPackages(req: AuthRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const packages = await PackageService.getVendorPackages(parseInt(vendorId as string));
      res.json({ succes: true, data: packages });
    } catch (error: any) {
      res.status(500).json({ succes: false, error: error.message });
    }
  }
}