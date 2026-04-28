import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ReservationService } from '../services/reservationService';
import { CreateReservationRequest } from '../types/api';

export class ReservationController {
  static async createReservation(req: AuthRequest, res: Response) {
    try {
      const { vendorId } = req.params;
      const data = req.body as CreateReservationRequest;
      const reservation = await ReservationService.createReservation(req.userId!, parseInt(vendorId as string), data);
      res.status(201).json({ succes: true, data: reservation });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }

  static async getReservations(req: AuthRequest, res: Response) {
    try {
      const reservations = await ReservationService.getReservations(req.userId!);
      res.json({ succes: true, data: reservations });
    } catch (error: any) {
      res.status(500).json({ succes: false, error: error.message });
    }
  }

  static async updateStatus(req: AuthRequest, res: Response) {
    try {
      const { reservationId } = req.params;
      const { status } = req.body;
      const result = await ReservationService.updateReservationStatus(req.userId!, parseInt(reservationId as string), status);
      res.json({ succes: true, data: result });
    } catch (error: any) {
      res.status(400).json({ succes: false, error: error.message });
    }
  }
}
