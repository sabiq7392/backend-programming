import { Request, Response } from 'express';
import { TypeData } from '../utils/Interface';
import ResponseJson from '../utils/ResponseJson';
import Student from '../model/Student';

export default class StudentController {
  public static async index(req: Request, res: Response) {
    const students = await Student.all();

    if (students === 0) {
      return ResponseJson.fail(res, {
        status: 404,
        message: 'Student not found',
      });
    }

    return ResponseJson.success<any>(res, {
      status: 200,
      message: 'Show all students',
      data: students,
    });
  }

  public static async show(req: Request, res: Response) {
    const id = Number(req.params.id);
    const student = await Student.find(id);

    if (student === 1) {
      return ResponseJson.fail(res, {
        status: 404,
        message: `Student not found. ID: ${id}`,
      });
    }

    return ResponseJson.success<any>(res, {
      status: 200,
      message: `Success get student. ID: ${id}`,
      data: student,
    });
  }

  public static async store(req: Request, res: Response) {
    const { name, nim, email, prodi } = req.body;

    if (name && nim && email && prodi) {
      await Student.create({ name, nim, email, prodi });

      return ResponseJson.success<TypeData>(res, {
        status: 201,
        message: `Success to add student. name: ${name}`,
        data: { name, nim, email, prodi },
      });
    }

    return ResponseJson.fail(res, {
      status: 400,
      message: 'Fail to add student, make sure the key must be name, nim, email, prodi',
    });
  }

  public static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { name, nim, prodi, email } = req.body;
    const student = await Student.update(id, { name, nim, prodi, email });

    switch (student) {
      case 1: {
        return ResponseJson.success<TypeData>(res, {
          status: 200,
          message: `Success to edit student. ID: ${id}, name: ${name}`,
          data: { name, nim, email, prodi },
        });
      }
      case 0: {
        return ResponseJson.fail(res, {
          status: 404,
          message: `Student cannot be found. ID: ${id}`,
        });
      }
      default: {
        return ResponseJson.fail(res, {
          status: 500,
          message: 'Student fail to update',
        });
      }
    }
  }

  public static async destroy(req: Request, res: Response) {
    const id = Number(req.params.id);
    const student = await Student.delete(id);

    switch (student) {
      case 1: {
        return ResponseJson.success(res, {
          status: 200,
          message: `Success to delete student. ID: ${id}`,
        });
      }
      case 0: {
        return ResponseJson.fail(res, {
          status: 404,
          message: `Student cannot be found. ID: ${id}`,
        });
      }
      default: {
        return ResponseJson.fail(res, {
          status: 500,
          message: 'Student fail to update',
        });
      }
    }
  }
}
