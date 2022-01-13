import express, { Request, Response } from 'express';
import { validateAuth, validatePost, validatePut } from '../middleware/Validate';
import Token from '../middleware/VerifyToken';
import authController from '../controllers/AuthController';
import patientController from '../controllers/PatientController';
import userController from '../controllers/UserController';
import db from '../config/database';

const Router = express.Router();

/**
 * @root
 */
Router.route('/')
  .get((req: Request, res: Response) => res.send('Covid Patients API - Author Sabiq'));

/**
 * @register
 */
Router.route('/auth/register')
  .post(validateAuth, authController.register);

Router.route('/auth/login')
  .post(validateAuth, authController.login);

/**
 * @users
 */
Router.route('/users')
  .get(userController.index);

Router.route('/users/:id')
  .get()
  .put()
  .delete();

/**
 * @patients
 */
Router.route('/patients')
  .get(Token.verifiy, patientController.index)
  .post(Token.verifiy, validatePost, patientController.store);

Router.route('/patients/:id')
  .get(Token.verifiy, patientController.show)
  .put(Token.verifiy, validatePut, patientController.update)
  .delete(Token.verifiy, patientController.destroy);

Router.route('/patients/search/:name')
  .get(Token.verifiy, patientController.searchByName);

Router.route('/patients/status/:status')
  .get(Token.verifiy, patientController.searchByStatus);

/**
 * @truncate
 */

// Router.route('/truncate')
//   .get((req: Request, res: Response) => {

//   });
export default Router;
