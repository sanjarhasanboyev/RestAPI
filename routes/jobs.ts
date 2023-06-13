import { Router } from "express";
import pool from '../config/db';

const router = Router();

//get all jobs
router.get('/', async (req, res) => {
   try {

      const jobs = await pool.query("SELECT * FROM job");
      res.status(200).json(jobs.rows);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


//add new job
router.post('/add', async (req, res) => {
   try {

      const newJob = await pool.query(`INSERT INTO job (title) VALUES ($1) RETURNING *`, [req.body.title]);
      res.status(201).json(newJob.rows);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


//delet job
router.delete('/:id', async (req, res) => {
   try {
      
      await pool.query('DELETE FROM employer WHERE job_id = $1', [req.params.id]);
      await pool.query('DELETE FROM job WHERE id = $1', [req.params.id]);
      res.status(200).json({message: 'Job deleted'})

   } catch (error) {
      res.status(500).json({ message: error })
   }
})

export default router;