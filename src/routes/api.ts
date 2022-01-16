import express, { Request, Response } from 'express';
import { validateAuth, validatePost, validatePut } from '../middleware/validate';
import Token from '../middleware/VerifiyToken';
import authController from '../controllers/AuthController';
import patientController from '../controllers/PatientController';
import userController from '../controllers/UserController';

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
  .get(Token.verifiy, userController.index)
  .post(Token.verifiy, validateAuth, userController.store);

Router.route('/users/:id')
  .get(Token.verifiy, userController.show)
  .put(Token.verifiy, validateAuth, userController.update)
  .delete(Token.verifiy, userController.destroy);

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

export default Router;
