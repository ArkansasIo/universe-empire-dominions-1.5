import { Router } from 'express';
import * as XenoberageController from './xenoberage.controller';

const router = Router();

router.get('/status', XenoberageController.getStatus);
// TODO: Add more Xenoberage routes as needed

export default router;
