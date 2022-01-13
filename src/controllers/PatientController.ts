import { Request, Response } from 'express';
import ResponseJson, { ResponseSuccessfully, ResponseFailed } from '../utils/ResponseJson';
import { GetResult } from '../config/ResultTypes';
import { Find } from '../model/Model';
import Patient from '../model/Patient';
import CrudController from './CrudController';

class PatientController extends CrudController {
  constructor() {
    super();
    /** @binding cause in that method there is an access to @this method */
    this.searchByName = this.searchByName.bind(this);
    this.searchByStatus = this.searchByStatus.bind(this);
    this.show = this.show.bind(this);
  }

  /** Show all patients */
  public async index(req: Request, res: Response) {
    try {
      const patients = await Patient.all();

      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: patients ? 'Show all patients' : 'Patients is empty',
          total: patients.length,
          data: patients,
        });

      // return res
      //   .status(200)
      //   .json(<ResponseSuccessfully>{
      //     isSuccess: true,
      //     message: 'Show all patients',
      //     total: patients.length,
      //     data: patients,
      //   });

    } catch (err) {
      console.error(err);
      return ResponseJson.catchError(res, err);
    }
  }

  /** Show detail patient by specific id */
  public async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this._searchBy(res, { id });
  }

  /** Create patient */
  public async store(req: Request, res: Response) {
    try {
      const patient = await Patient.create(req.body);
      return res
        .status(201)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: 'Patient is added successfully',
          data: patient,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** Update patient wheter is sending partials or full data */
  public async update(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      const findPatient = await Patient.find({ id });
      const patientNotFound = !findPatient;

      if (patientNotFound) {
        return res
          .status(404)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: `Patient not found: ID = ${id}`,
          });
      }

      const patient = await Patient.update(id, req.body);
      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `Patients has been update successfully. id: ${id}`,
          data: patient,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** Delete patient */
  public async destroy(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      const findPatient = await Patient.find({ id });
      const patientNotFound = !findPatient;

      if (patientNotFound) {
        return res
          .status(404)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: `Patient not found: ID: ${id}`,
          });
      }

      const patient = await Patient.delete(id);
      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          status: 200,
          isSuccess: true,
          message: `Patiens has been deleted successfully: ID: ${id}`,
          data: patient,
        });

    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }

  /** Search patients based by name */
  public async searchByName(req: Request, res: Response) {
    const { name } = req.params;
    return this._searchBy(res, { name });
  }

  /** Search patients based by status */
  public async searchByStatus(req: Request, res: Response) {
    const { status } = req.params;
    return this._searchBy(res, { status });
  }

  /**
   * @_searchBy
   * @desc search specific data by build another method
   * @param res make Response to express
   * @param find send data to find in database based on "key as name of column "
   * and "value as value of column"
   * @example acccess to your other method, "return this_searchBy(res, { id: 1 })"
   * @returns status, isSuccess, message, total, searched data
   */
  private async _searchBy(res: Response, find: Find) {
    try {
      const key = Object.keys(find)[0];
      const value = Object.values(find)[0];
  
      const patient = await Patient.find(find);
      if (!patient) {
        return res
          .status(404)
          .json(<ResponseFailed>{
            isSuccess: false,
            message: `Patient not found: ${key.toUpperCase()} = ${value}`,
          });
      }
  
      return res
        .status(200)
        .json(<ResponseSuccessfully>{
          isSuccess: true,
          message: `Patient founded: ${key.toUpperCase()} = ${value}`,
          total: patient.length,
          data: patient,
        });
    } catch (err) {
      return ResponseJson.catchError(res, err);
    }
  }
}

const patientController = new PatientController();

export default patientController;
