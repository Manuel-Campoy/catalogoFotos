import { Router } from 'express';
import { PackageController } from '../controllers/packageController';
import { authMiddleware, vendorOnlyMiddleware } from '../middleware/auth';

const router = Router();

router.post('/vendors/:vendorId/packages', authMiddleware, vendorOnlyMiddleware, PackageController.createPackage);
router.put('/vendors/:vendorId/packages/:packageId', authMiddleware, vendorOnlyMiddleware, PackageController.updatePackage);
router.delete('/vendors/:vendorId/packages/:packageId', authMiddleware, vendorOnlyMiddleware, PackageController.deletePackage);
router.get('/vendors/:vendorId/packages', PackageController.getVendorPackages);

export default router;