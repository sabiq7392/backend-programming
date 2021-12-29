import { Response } from 'express';

interface DataJson {
  status: number,
  message: string,
  data?: Array<string>,
}

export default class ResponseJson {
  public static success(res: Response, dataJson: DataJson): void {
    const { status, message, data } = dataJson;
    res
      .status(status)
      .json({ status, message, data });
  }

  public static fail(res: Response, dataJson: DataJson): void {
    const { status, message } = dataJson;
    res
      .status(status)
      .json({ status, message });
  }
}
