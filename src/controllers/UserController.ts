import { Request, Response } from 'express';
import { ResponseFailed, ResponseSuccessfully } from '../utils/ResponseJson';
import User from '../model/User';

class UserController {
  public async index(req: Request, res: Response) {
    const users = await User.all();

    return res
      .status(200)
      .json(<ResponseSuccessfully>{
        isSuccess: true,
        message: users.length > 0 ? 'Show all users' : 'User is empty',
        total: users.length,
        data: users,
      });
  }

  public async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.findOne({ id });

    const userDidntExist = !user;
    if (userDidntExist) {
      return res
        .status(404)
        .json(<ResponseFailed>{
          isSuccess: false,
          message: `User not found: ID = ${id}`,
        });
    }

    return res
      .status(200)
      .json(<ResponseSuccessfully>{
        isSuccess: true,
        message: `User founded: ID = ${id}`,
        data: user,
      });
  }
}

const userController = new UserController();

export default userController;
