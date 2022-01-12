import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Auth from '../model/Auth';
import { responseSuccessfully } from '../utils/ResponseJson';

require('dotenv').config();

class AuthController {
  constructor() {
    this.login = this.login.bind(this);
  }

  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await Auth.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ _username: user.username }, process.env.TOKEN_RAHASIA as string);
    }
  }

  public async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Auth.create({ username, password: hashedPassword });
    return responseSuccessfully(res, {
      status: 201,
      isSuccess: true,
      message: 'Account has been created',
      data: user,
    });
  }
}

const authController = new AuthController();

export default authController;
