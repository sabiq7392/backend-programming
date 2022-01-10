import { Response } from 'express';
import { DataJson } from '../config/ResultInterfaces';

/**
 * !important
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

export const responseSuccessfully = (res: Response, dataJson: DataJson):
Response<any, Record<string, any>> => {
  const { status } = dataJson;
  return res
    .status(status)
    .json(dataJson);
};

export const responseFailed = (res: Response, dataJson: DataJson):
Response<any, Record<string, any>> => {
  const { status } = dataJson;
  return res
    .status(status)
    .json(dataJson);
};
