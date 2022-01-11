import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql';
import { Response } from 'express';
/**
 * @IMPORTANT
 * Type for Result.
 *
 * @should declare what type is "promise", so you can edit or
 * manipulation the result in controllers
 */

// ====== for Generic
export type GetResult = (
  RowDataPacket | RowDataPacket[] | RowDataPacket[][]
);

export type PostResult = (
  ResultSetHeader | OkPacket
);

// ======= for Promise
export type PromiseGet = (
  Promise<GetResult>
);

export type PromisePost = (
  Promise<PostResult | GetResult>
);

// ======= for Controller
export type CrudResult = (
  Promise<Response<any, Record<string, any>>>
);
