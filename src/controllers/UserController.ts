import { Request, Response } from 'express';
import User from '../model/User';
import { responseSuccessfully } from '../utils/ResponseJson';

class UserController {
  public async index(req: Request, res: Response) {
    const users = await User.all();

    return responseSuccessfully(res, {
      status: 200,
      isSuccess: true,
      message: 'Show all users',
      total: users.length,
      data: users,
    });
  }
}

const userController = new UserController();

export default userController;
