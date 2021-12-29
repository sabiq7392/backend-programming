import { Request, Response } from 'express';
import students from '../data/students';
import ResponseJson from '../utils/ResponseJson';
import Validate from '../utils/Validate';

export default class StudentController {
  public static index(req: Request, res: Response) {
    return ResponseJson.success(res, {
      status: 200,
      message: 'Show all students',
      data: students,
    });
  }

  public static store(req: Request, res: Response) {
    const { name } = req.body;
    if (Validate.string(name)) {
      students.push(name);

      return ResponseJson.success(res, {
        status: 201,
        message: `Success to add student: ${name}`,
        data: students,
      });
    }

    return ResponseJson.fail(res, {
      status: 400,
      message: 'Fail to add student, make sure the key must be name',
    });
  }

  public static update(req: Request, res: Response) {
    const id = Number(req.params.id) - 1;
    const { name } = req.body;

    if (id < students.length) {
      students[id] = name;

      return ResponseJson.success(res, {
        status: 200,
        message: `Success to edit student: ${id}, name: ${name}`,
        data: students,
      });
    }

    if (id > students.length) {
      return ResponseJson.fail(res, {
        status: 404,
        message: 'Student cannot be found',
      });
    }

    return ResponseJson.fail(res, {
      status: 500,
      message: 'Student fail to update',
    });
  }

  public static destroy(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10) - 1;

    if (id < students.length) {
      students.splice(id, 1);

      return ResponseJson.success(res, {
        status: 200,
        message: `Success to delete student: ${id}`,
        data: students,
      });
    }

    if (id > students.length) {
      return ResponseJson.fail(res, {
        status: 404,
        message: `Student cannot be found: ${id}`,
      });
    }

    return ResponseJson.fail(res, {
      status: 500,
      message: 'Student fail to update',
    });
  }
}
