import { Router } from "express";
import pool from '../config/db';

const router = Router();

//get all employers
router.get('/', async (req, res) => {
   try {

      const employers = await pool.query('SELECT * FROM employer');
      res.status(200).json(employers.rows);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


//get employer by id
router.get('/:id', async (req, res) => {
   try {

      const employer = await pool.query(`
      SELECT * FROM employer LEFT JOIN job ON job.id = employer.job_id WHERE employer.id = $1
      `, [req.params.id]);

      res.status(200).json(employer.rows[0]);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


// add new employer
router.post('/add', async (req, res) => {
   try {

      const { name, salary, degree, job_id } = req.body;

      const newEmployer = await pool.query(
         'INSERT INTO employer (name, degree, salary, job_id) VALUES ($1, $2, $3, $4) RETURNING *',
         [name, degree, salary, job_id]);

      res.status(201).json(newEmployer.rows[0]);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


// update employer
router.put('/:id', async (req, res) => {
   try {

      const { id } = req.params;
      const { name, salary, degree, job_id } = req.body;

      const updatedEmployer = await pool.query(
         'UPDATE employer SET name = $1, degree = $2, salary = $3, job_id = $4 WHERE id = $5 RETURNING *',
         [name, degree, salary, job_id, id]);

      res.status(201).json(updatedEmployer.rows[0]);

   } catch (error) {
      res.status(500).json({ message: error })
   }
})


//delete employer
router.delete('/:id', async (req, res) => {
   try {

      await pool.query('DELETE FROM employer WHERE id = $1', [req.params.id]);
      res.status(200).json({ message: "Employer deleted" })

   } catch (error) {
      res.status(500).json({ message: error })
   }
})

export default router;