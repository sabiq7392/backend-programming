import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import ResponseJson, { ResponseFailed, ResponseSuccessfully } from '../utils/ResponseJson';
import User from '../model/User';
import CrudController from './CrudController';

class UserController extends CrudController {
  /** @important data to send to crud controller */
  public _model = User;
  public _data = 'User';

  constructor() {
    super();
    /** @binding cause in that method there is an access to @this method */
    this.show = this.show.bind(this);
    this.destroy = this.destroy.bind(this);
    this.update = this.update.bind(this);
  }

  /** create account user is action for role: admin and encrypt password */
  public async store(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      /** check if user already exist, fail to create account */
      const userAlreadyExist = await User.findOne({ username });
      if (userAlreadyExist) {
        return res
          .status(409)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: 'Username already exist try another username',
          });
      }

      /** @hashedPassword is an action to encrypt password */
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ username, password: hashedPassword });

      return res
        .status(201)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `Account has been created: USERNAME = ${username}`,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** update account user and encrypt updated password */
  public async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const { username, password } = req.body;
      const user = await User.findOne({ id });
      
      /** check if user not found, do fail response to update account  */
      const userNotFound = !user;
      if (userNotFound) { 
        return res
          .status(404)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: `User not found: ID = ${id}`,
          });
      }

      /** check if username already exist, do fail to update account */
      const userAlreadyExist = await User.findOne({ username });
      if (userAlreadyExist) {
        return res
          .status(409)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: 'Username already exist try another username',
          });
      }

      /** @hashedPassword is an action to encrypt password */
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.update(id, { username, password: hashedPassword });

      return res
        .status(201)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `Account has been Updated: USERNAME = ${username}`,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }
}

const userController = new UserController();

export default userController;
