import { Router } from "express";
import pool from '../config/db';

const router = Router();

router.get('/', async (req, res) => {
   const jobs = await pool.query("SELECT * ALL job");
   res.status(200).json(jobs);
})

export default router;