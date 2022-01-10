import { RowDataPacket, OkPacket, ResultSetHeader } from 'mysql';
import { Response } from 'express';
/**
 * Important
 * Type for Promise Result.
 *
 * should declare what type is promise, so you can edit or
 * manipulation the result in controllers
 */

// ======= for Model
export type GetResult = (
  RowDataPacket | RowDataPacket[] | RowDataPacket[][]
);

export type PostResult = (
  ResultSetHeader | OkPacket
);

// ======= for Controller
export type CrudResult = (
  Promise<Response<any, Record<string, any>>>
);
