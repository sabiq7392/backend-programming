import { Response } from 'express';
import { DataJson } from './Interfaces';

// export default class ResponseJson {
//   public static success(res: Response, dataJson: DataJson): void {
//     const { status, message, data } = dataJson;
//     res
//       .status(status)
//       .json({ status, message, data });
//   }

//   public static fail(res: Response, dataJson: DataJson): void {
//     const { status, message, data } = dataJson;
//     res
//       .status(status)
//       .json({ status, message, data });
//   }
// }
export const responseSuccessfully = (res: Response, dataJson: DataJson):
Response<any, Record<string, any>> => {
  const { status, message, data } = dataJson;
  return res
    .status(status)
    .json({ status, message, data });
};

export const responseFailed = (res: Response, dataJson: DataJson):
Response<any, Record<string, any>> => {
  const { status, message, data, errors } = dataJson;
  return res
    .status(status)
    .json({ status, message, data, errors });
};
