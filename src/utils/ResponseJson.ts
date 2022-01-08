import { Response } from 'express';
import { TypeDataJson } from './Interfaces';

export default class ResponseJson {
  public static success(res: Response, dataJson: TypeDataJson): void {
    const { status, message, data } = dataJson;
    res
      .status(status)
      .json({ status, message, data });
  }

  public static fail(res: Response, dataJson: TypeDataJson): void {
    const { status, message, data } = dataJson;
    res
      .status(status)
      .json({ status, message, data });
  }
}
