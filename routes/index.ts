import { Router } from "express";
import jobs from './jobs'
const router = Router();

router.use('/jobs', jobs);

export default router;