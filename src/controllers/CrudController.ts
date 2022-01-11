/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { CrudResult } from '../config/ResultTypes';

export default abstract class CrudController {
  public abstract index(req: Request, res: Response): CrudResult;

  public abstract show(req: Request, res: Response): CrudResult;

  public abstract store(req: Request, res: Response): CrudResult;

  public abstract update(req: Request, res: Response): CrudResult;

  public abstract destroy(req: Request, res: Response): CrudResult;
}
