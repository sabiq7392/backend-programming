import express, { Request, Response } from 'express';
import PatientController from '../controllers/PatientController';
import ValidatePost from '../middleware/Validate';

const router = express.Router();

router.route('/')
  .get((req: Request, res: Response) => res.send('Covid Patients API - Author Sabiq'));

router.route('/patients')
  .get(PatientController.index)
  .post(ValidatePost, PatientController.store);

router.route('/patients/:id')
  .get(PatientController.show)
  .delete(PatientController.destroy)
  .put(PatientController.update);

export default router;
