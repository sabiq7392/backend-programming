import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/User';
import ResponseJson, { ResponseFailed, ResponseSuccessfully } from '../utils/ResponseJson';

require('dotenv').config();

class AuthController {
  constructor() {
    /** @binding cause in that method there is an access to @this method */
    this.login = this.login.bind(this);
  }

  /**
   * @desc login to access data or manipulate it.
   * There is an action to decrypt password for compare and generate token for accessing data
   *
   * @returns when success get token to access, errors
   */
  public async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      /** handle if account didn't exist */
      const user = await User.findOne({ username });

      const userDidntExist = !user;
      if (userDidntExist) {
        return res.status(404).json(<ResponseFailed>{
          isSuccess: false,
          message: 'Account didnt exist',
        });
      }

      /** @match compare password from login and encrypt password in database. */
      const match = await bcrypt.compare(password, user.password);

      const notMatch = !match;
      if (notMatch) {
        return res
          .status(403)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: 'Wrong username or password',
          });
      }

      /** @token is action to build token for accesing and manipulate database */
      const { TOKEN_SECRET, TOKEN_EXPIRES_IN } = process.env;

      const token = jwt.sign(
        { _username: user.username },
        TOKEN_SECRET as string,
        { expiresIn: TOKEN_EXPIRES_IN as string },
      );

      /** Checking duration for devlopment */
      console.log(TOKEN_EXPIRES_IN);
      
      return res
        .header('auth-token', token)
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: 'Login success',
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** register to create an account for user. There is an action to encrypt password */
  public async register(req: Request, res: Response) {
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
}

const authController = new AuthController();

export default authController;
