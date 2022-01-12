import { Response } from 'express';
import { GetResult, PostResult } from '../config/ResultTypes';

/**
 * @status for status code, ex: "200 for OK, 404 for not found"
 * @isSuccess for condition with boolean wheter is "true" or "false"
 * @message for message, ex: "data is succes to update"
 * @total get total the data you can get
 * @data get the result when the data is has been CRUD
 * @errors use to get error result when data is failed whether is CRUD or NO
 */

interface DataSuccess {
  status: number,
  isSuccess: boolean,
  message: string,
  total?: number,
  data: GetResult | PostResult | any,
}

interface DataFail {
  status: number,
  isSuccess: boolean,
  message?: string,
  errors?: any,
}

interface CatchError {
  isSuccess: boolean,
  errors: any,
}

/**
 * !IMPORTANT
 *
 * this response specially for controllers method to get the result
 * where is failed or successfully
 *
 * @param res first thing to do is to declare this so your response is Running
 * @param dataJson what result you can get, you set the result in utils/Interfaces.ts
 *
 * @returns the return is your important data should send
 *  dont forget to return to in conttrollers method
 */

export const responseSuccessfully = (res: Response, dataJson: DataSuccess):
Response<any, Record<string, any>> => {
  const { status, isSuccess, message, total, data } = dataJson;
  return res
    .status(status)
    .json({ isSuccess, message, total, data });
};

export const responseFailed = (res: Response, dataJson: DataFail):
Response<any, Record<string, any>> => {
  const { status, isSuccess, message, errors } = dataJson;
  return res
    .status(status)
    .json({ isSuccess, message, errors });
};

export const responseCatchError = (res: Response, _catch: CatchError) => {
  const { isSuccess, errors } = _catch;
  return res
    .json({ isSuccess, errors });
};
