import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseSuccessfully, responseFailed, responseCatchError } from '../utils/ResponseJson';
import { GetResult } from '../config/ResultTypes';
import { Find } from '../model/Model';
import Patient from '../model/Patient';
import CrudController from './CrudController';
import { json } from 'stream/consumers';

class PatientController extends CrudController {
  constructor() {
    super();
    /**
     * @binding cause in that method there is an access to @this method
     */
    this.searchByName = this.searchByName.bind(this);
    this.searchByStatus = this.searchByStatus.bind(this);
    this.show = this.show.bind(this);
  }

  public async index(req: Request, res: Response) {
    try {
      const patients: GetResult = await Patient.all();

      if (!patients) {
        return responseSuccessfully(res, {
          status: 200,
          isSuccess: true,
          message: 'Patient is empty',
          data: patients,
        });
      }

      return responseSuccessfully(res, {
        status: 200,
        isSuccess: true,
        message: 'Show All Patients',
        total: patients.length,
        data: patients,
      });
    } catch (err) {
      console.error(err);
      return responseCatchError(res, { isSuccess: false, errors: err });
    }
  }

  public async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this._searchBy(res, { id });
  }

  public async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFailed(res, {
        status: 422,
        isSuccess: false,
        errors: errors.array(),
      });
    }

    const patient = await Patient.create(req.body);
    return responseSuccessfully(res, {
      status: 201,
      isSuccess: true,
      message: 'Patient is added successfully',
      data: patient,
    });
  }

  public async update(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const findPatient = await Patient.find({ id });
    if (!findPatient) {
      return responseFailed(res, {
        status: 404,
        isSuccess: false,
        message: `Patient not found: ID: ${id}`,
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFailed(res, {
        status: 400,
        isSuccess: false,
        errors: errors.array(),
      });
    }

    const patient = await Patient.update(id, req.body);
    return responseSuccessfully(res, {
      status: 200,
      isSuccess: true,
      message: `Patients has been update successfully. id: ${id}`,
      data: patient,
    });
  }

  public async destroy(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const findPatient = await Patient.find({ id });
    if (!findPatient) {
      return responseFailed(res, {
        status: 404,
        isSuccess: false,
        message: `Patient not found: ID: ${id}`,
      });
    }

    const patient = await Patient.delete(id);
    return responseSuccessfully(res, {
      status: 200,
      isSuccess: true,
      message: `Patiens has been deleted successfully: ID: ${id}`,
      data: patient,
    });
  }

  public async searchByName(req: Request, res: Response) {
    const { name } = req.params;
    return this._searchBy(res, { name });
  }

  public async searchByStatus(req: Request, res: Response) {
    const { status } = req.params;
    return this._searchBy(res, { status });
  }

  /**
   *
   * @desc
   * @param res make Response to express
   * @param find send data to find in database based on "key as name of column "
   * and "value as value of column"
   * @example acccess to your other method, "return this_searchBy(res, { id: 1 })"
   * @returns status, isSuccess, message, total, searched data
   */
  private async _searchBy(res: Response, find: Find) {
    const key = Object.keys(find)[0];
    const value = Object.values(find)[0];

    const patient = await Patient.find(find);
    if (!patient) {
      return responseFailed(res, {
        status: 404,
        isSuccess: false,
        message: `Patient not found: ${key.toUpperCase()} = ${value}`,
      });
    }

    return responseSuccessfully(res, {
      status: 200,
      isSuccess: true,
      message: `Patients found ${key.toUpperCase()} = ${value}`,
      total: patient.length,
      data: patient,
    });
  }
}

const patientController = new PatientController();

export default patientController;
