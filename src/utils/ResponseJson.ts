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

export interface DataSuccess {
  status: number,
  isSuccess: true,
  message: string,
  total?: number,
  data?: GetResult | PostResult,
}

export interface ResponseSuccessfully {
  isSuccess: true,
  message: string,
  total?: number,
  data?: GetResult | PostResult,
}

export interface DataFail {
  status: number,
  isSuccess: false,
  message?: string,
  errors?: any,
}

export interface ResponseFailed {
  isSuccess: false,
  message: string,
  errors?: any,
}

export interface CatchError {
  isSuccess: false,
  errors: any,
}

export interface ResponseCatchError {
  isSuccess: false,
  errors: any,
}

/**
 *
 * this response specially for controllers method to get the result
 * where is failed or successfully.
 *
 * @actually dont have to use this, is only to make response keep consistent
 * cause there are interface to making sending response keep consistent
 * and reason to use if there are too much code the "name function" help you to
 * make code more readability
 *
 * you can just use regular res.status().json()
 *
 * @param res first thing to do is to declare this so your response is Running
 * @param dataJson what result you can get,
 * @set the result in interface located in top
 *
 * @returns the return is your important data should send
 *  dont forget to return to in conttrollers method
 */

export default class ResponseJson {
  public static successfully(res: Response, dataJson: DataSuccess) {
    const { status, message, total, data } = dataJson;
    return res
      .status(status)
      .json({ isSuccess: true, message, total, data });
  }

  public static failed(res: Response, dataJson: DataFail) {
    const { status, message, errors } = dataJson;
    return res
      .status(status)
      .json({ isSuccess: false, message, errors });
  }

  public static catchError(res: Response, err: any) {
    return res
      .status(400)
      .json(<ResponseCatchError>{
        isSuccess: false,
        errors: `Unexpected ${err}`,
      });
  }
}
