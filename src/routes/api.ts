import express, { Request, Response } from 'express';
import authController from '../controllers/AuthController';
import patientController from '../controllers/PatientController';
import { ValidatePost, ValidatePut } from '../middleware/Validate';

const Router = express.Router();

Router.route('/')
  .get((req: Request, res: Response) => res.send('Covid Patients API - Author Sabiq'));

// Authentication
Router.route('/auth/register')
  .post(authController.register);

Router.route('/auth/login')
  .post(authController.login);

// Patients
Router.route('/patients')
  .get(patientController.index)
  .post(ValidatePost, patientController.store);

Router.route('/patients/:id')
  .get(patientController.show)
  .put(ValidatePut, patientController.update)
  .delete(patientController.destroy);

Router.route('/patients/search/:name')
  .get(patientController.searchByName);

Router.route('/patients/status/:status')
  .get(patientController.searchByStatus);

export default Router;
