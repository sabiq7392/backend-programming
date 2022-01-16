/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import ResponseJson, { ResponseSuccessfully, ResponseFailed } from '../utils/ResponseJson';

/**
 *
 * @desc This create blueprint of basic method controller when there are "CRUD" action in it.
 * this to keep consistent to making a controller CRUD,
 */

export default abstract class CrudController {
  public abstract _model: any;
  public abstract _data: string;

  constructor() {
    /** @binding cause in that method there is an access to @this method */
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /** show all data in specific table */
  public async index(req: Request, res: Response) {
    try {
      const data = await this._model.all();

      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: data ? `Show all ${this._data}s` : `${this._data}s is empty`,
          total: data.length,
          data,
        });

    } catch (err) {
      console.error(err);
      return ResponseJson.catchError(res, err);
    }
  }

  /** show detail data by specific id in specific table */
  public async show(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const data = await this._model.findOne({ id });
  
      const dataNotFound = !data;
      if (dataNotFound) { 
        return this._responseFailDataNotFound(res, id);
      }

      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `${this._data} founded: ID = ${id}`,
          data,
        });

    } catch (err) { 
      return ResponseJson.catchError(res, err); 
    }
  }

  /** create data in specific table */
  public async store(req: Request, res: Response) {
    try {
      const data = await this._model.create(req.body);
      return res
        .status(201)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `${this._data} is added successfully`,
          data,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** update data by in specific id and specific table */
  public async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      const findData = await this._model.find({ id });
      const dataNotFound = !findData;

      if (dataNotFound) {
        return this._responseFailDataNotFound(res, id);
      }

      const data = await this._model.update(id, req.body);
      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `${this._data} is updated successfully. id: ${id}`,
          data,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** delete data in specific id and specific table */
  public async destroy(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const findData = await this._model.findOne({ id });
      
      const dataNotFound = !findData;
      if (dataNotFound) { 
        return this._responseFailDataNotFound(res, id);
      }
      
      const data = await this._model.delete(id);
      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `${this._data} is deleted successfully: ID = ${id}`,
          data,
        });

    } catch (err) { 
      return ResponseJson.catchError(res, err); 
    }
  }

  /** response fail when data not found */
  private async _responseFailDataNotFound(res: Response, id: number) {
    return res
      .status(404)
      .json(<ResponseFailed>{
        isSuccess: false,
        message: `${this._data} not found: ID = ${id}`,
      });
  }
}
