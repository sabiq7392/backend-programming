import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import PatientController from '../controllers/PatientController';

const router = express.Router();

router.route('/')
  .get((req: Request, res: Response) => res.send('Covid Patients API - Author Sabiq'));

router.route('/patients')
  .get(PatientController.index)
  .post(body('phone').isLength({ min: 7 }), PatientController.store);

router.route('/patients/:id')
  .get(PatientController.show)
  .delete(PatientController.destroy)
  .put(PatientController.update);

export default router;
