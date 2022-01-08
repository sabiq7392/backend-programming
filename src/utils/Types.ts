import { RowDataPacket, OkPacket, FieldPacket, ResultSetHeader } from 'mysql';

export type GetResult =
  RowDataPacket | RowDataPacket[] | RowDataPacket[][];

export type PostResult =
  ResultSetHeader | OkPacket;
