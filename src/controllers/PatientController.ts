import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import ResponseJson from '../utils/ResponseJson';
import Patient from '../model/Patient';

//  BELOM BUAT VALIDASI
export default class PatientController {
  public static async index(req: Request, res: Response) {
    const patients = await Patient.all();

    if (patients.length !== 0) {
      return ResponseJson.success(res, {
        status: 200,
        message: 'Show All Patients',
        data: patients,
      });
    }

    return ResponseJson.fail(res, {
      status: 404,
      message: 'Student is empty',
    });
  }

  public static async show(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    const patient = await Patient.find(id);

    if (patient) {
      return ResponseJson.success(res, {
        status: 200,
        message: `Get detail patient. id: ${id}`,
        data: patient,
      });
    }

    return ResponseJson.fail(res, {
      status: 404,
      message: `Student not found. id: ${id}`,
    });
  }

  public static async store(req: Request, res: Response) {
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const patient = await Patient.create({
      name, phone, address, status, in_date_at, out_date_at,
    });

    return ResponseJson.success(res, {
      status: 201,
      message: 'Patient is added successfully',
      data: patient,
    });
  }

  public static async update(req: Request, res: Response) {
    // const id: number = Number(req.params.id);
    // const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    // const patient = await Patient.update(id, {
    //   name, phone, address, status, in_date_at, out_date_at,
    // });

    // return ResponseJson.success(res, {
    //   status: 200,
    //   message: `Patients is update successfully. id: ${id}`,
    //   data: patient,
    // });
  }

  public static async destroy(req: Request, res: Response) {
    // const id: number = Number(req.params.id);
    // const patient = await Patient.delete(id);

    // return ResponseJson.success(res, {
    //   status: 200,
    //   message: `Patiens is delete successfully. id: ${id}`,
    //   data: patient,
    // });
  }
}
