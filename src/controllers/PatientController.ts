/* eslint-disable lines-between-class-members */
import { Request, Response } from 'express';
import ResponseJson, { ResponseSuccessfully, ResponseFailed } from '../utils/ResponseJson';
import { Find } from '../model/Model';
import Patient from '../model/Patient';
import CrudController from './CrudController';

class PatientController extends CrudController {
  public _model = Patient;
  public _data = 'Patient';

  constructor() {
    super();
    /** @binding cause in that method there is an access to @this method */
    this.searchByName = this.searchByName.bind(this);
    this.searchByStatus = this.searchByStatus.bind(this);
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
