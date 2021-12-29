import { Response } from 'express';
import { TypeDataJson } from './Interface';

export default class ResponseJson {
  public static success<T>(res: Response, dataJson: TypeDataJson<T>): void {
    const { status, message, data } = dataJson;
    res
      .status(status)
      .json({ status, message, data });
  }

  public static fail(res: Response, dataJson: TypeDataJson<any>): void {
    const { status, message, data } = dataJson;
    res
      .status(status)
      .json({ status, message, data });
  }
}
