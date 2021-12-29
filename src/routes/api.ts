import express, { Request, Response } from 'express';
import StudentController from '../controllers/StudentController';

const router = express.Router();

router.route('/')
  .get((req: Request, res: Response) => res.send('Students API - Author Sabiq'));

router.route('/students')
  .get(StudentController.index)
  .post(StudentController.store);

router.route('/students/:id')
  .put(StudentController.update)
  .delete(StudentController.destroy)
  .get(StudentController.show);

export default router;
