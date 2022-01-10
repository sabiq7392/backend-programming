import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Patient from '../model/Patient';
import { responseSuccessfully, responseFailed } from '../utils/ResponseJson';
import { GetResult } from '../config/PromiseType';
import { Find } from '../model/Model';
import CrudController from './CrudController';

class PatientController extends CrudController {
  public async index(req: Request, res: Response) {
    const patients: GetResult = await Patient.all();

    if (patients.length <= 0) {
      return responseFailed(res, {
        status: 404,
        message: 'Patient is empty',
      });
    }

    return responseSuccessfully(res, {
      status: 200,
      message: 'Show All Patients',
      data: patients,
    });
  }

  public async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    return this._searchBy(res, { id });
  }

  public async store(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFailed(res, {
        status: 400,
        errors: errors.array(),
      });
    }

    const patient = await Patient.create(req.body);
    return responseSuccessfully(res, {
      status: 201,
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
        message: `Patient not found: ID: ${id}`,
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseFailed(res, {
        status: 400,
        errors: errors.array(),
      });
    }

    const patient = await Patient.update(id, req.body);
    return responseSuccessfully(res, {
      status: 200,
      message: `Patients is update successfully. id: ${id}`,
      data: patient,
    });
  }

  public async destroy(req: Request, res: Response) {
    const id: number = Number(req.params.id);

    const findPatient = await Patient.find({ id });
    if (!findPatient) {
      return responseFailed(res, {
        status: 404,
        message: `Patient not found: ID: ${id}`,
      });
    }

    const patient = await Patient.delete(id);
    return responseSuccessfully(res, {
      status: 200,
      message: `Patiens is delete successfully: ID: ${id}`,
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

  private async _searchBy(res: Response, param: Find) {
    const key = Object.keys(param)[0];
    const value = Object.values(param)[0];

    const patient = await Patient.find(param);
    if (!patient) {
      return responseFailed(res, {
        status: 404,
        message: `Patient is not found: ${key.toUpperCase()} = ${value}`,
      });
    }

    return responseSuccessfully(res, {
      status: 200,
      message: `Show all patients with ${key.toUpperCase()} = ${value}`,
      data: patient,
    });
  }
}

const patientController = new PatientController();

export {
  patientController,
  PatientController,
};
