import express, { Request, Response } from 'express';
import { patientController, PatientController } from '../controllers/PatientController';
import { ValidatePost, ValidatePut } from '../middleware/Validate';

const Router = express.Router();

Router.route('/')
  .get((req: Request, res: Response) => res.send('Covid Patients API - Author Sabiq'));

Router.route('/patients')
  .get(patientController.index)
  .post(ValidatePost, patientController.store);

Router.route('/patients/:id')
  .get((req: Request, res: Response) => patientController.show(req, res))
  .put(ValidatePut, patientController.update)
  .delete(patientController.destroy);

// ======================================================

/**
 * Binding, cause in that public method there is an access to the private method
 */
Router.route('/patients/search/:name')
  .get((req: Request, res: Response) => patientController.searchByName(req, res));

Router.route('/patients/status/:status')
  .get((req: Request, res: Response) => patientController.searchByStatus(req, res));

// Router.route('/patients/status/recovered')
//   .get((req: Request, res: Response) => patientController.recovered(req, res));

// Router.route('/patients/status/dead')
//   .get((req: Request, res: Response) => patientController.dead(req, res));

// ======================================================

export default Router;
