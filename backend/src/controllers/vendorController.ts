import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { VendorService } from '../services/vendorService';
import { CreateVendorRequest, VendorFilterQuery } from '../types/api';

export class VendorController {
  static async createVendor(req: AuthRequest, res: Response) {
    try {
      const data = req.body as CreateVendorRequest;
      const vendor = await VendorService.createVendor(req.userId!, data);
      res.status(201).json({ succes: true, data: vendor });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async getVendors(req: AuthRequest, res: Response) {
    try {
      const filters = req.query as unknown as VendorFilterQuery;
      const vendors = await VendorService.getVendors(filters);
      res.json({ succes: true, data: vendors });
    } catch (error: any) {
      res.status(500).json({ succes: false, error: error.message });
    }
  }

  static async getVendor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const vendor = await VendorService.getVendorById(parseInt(id as string));
      res.json({ succes: true, data: vendor });
    } catch (error: any) {
      res.status(404).json({ succes: false, error: error.message });
    }
  }

  static async updateVendor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body as Partial<CreateVendorRequest>;
      const vendor = await VendorService.updateVendor(req.userId!, parseInt(id as string), data);
      res.json({ succes: true, data: vendor });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async deleteVendor(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const result = await VendorService.deleteVendor(req.userId!, parseInt(id as string));
      res.json({ succes: true, data: result });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }
}