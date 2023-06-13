import { Router } from "express";
import jobs from './jobs';
import employers from './employers';

const router = Router();

router.use('/jobs', jobs);
router.use('/employers', employers);

export default router;