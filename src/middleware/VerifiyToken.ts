import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ResponseJson from '../utils/ResponseJson';

/**
 * @desc check token if is there give granted permisson,
 * if no send errors
 */
export default class Token {
  public static async verifiy(req: Request, res: Response, next: NextFunction) {
    try {
      /** @token get token */
      const token = req.header('auth-token');

      /** @failed send errors */
      const invalidToken = !token;
      if (invalidToken) {
        return res.status(401).send('Dont have access');
      }
  
      /** @verifiedUser verifiy token they use is it valid or no */
      const { TOKEN_SECRET } = process.env;
      const verifiedUser = jwt.verify(token, TOKEN_SECRET as string);
      req.user = verifiedUser;

      return next();
  
    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }
}
