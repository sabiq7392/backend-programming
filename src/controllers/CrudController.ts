/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';

/**
 *
 * @desc This create blueprint of basic method controller when there are "CRUD" action in it.
 * this to keep consistent to making a controller CRUD,
 */
export default abstract class CrudController {
  public abstract index(req: Request, res: Response): any;

  public abstract show(req: Request, res: Response): any;

  public abstract store(req: Request, res: Response): any;

  public abstract update(req: Request, res: Response): any;

  public abstract destroy(req: Request, res: Response): any;
}
