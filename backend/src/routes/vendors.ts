import { Router } from 'express';
import { VendorController } from '../controllers/vendorController';
import { authMiddleware, vendorOnlyMiddleware } from '../middleware/auth';
import { validateCreateVendor } from '../middleware/validation';

const router = Router();

router.post('/', authMiddleware, vendorOnlyMiddleware, validateCreateVendor, VendorController.createVendor);
router.get('/', VendorController.getVendors);
router.get('/:id', VendorController.getVendor);
router.put('/:id', authMiddleware, vendorOnlyMiddleware, VendorController.updateVendor);
router.delete('/:id', authMiddleware, vendorOnlyMiddleware, VendorController.deleteVendor);

export default router;