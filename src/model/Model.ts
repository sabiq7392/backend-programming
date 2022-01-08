import { OkPacket, QueryError } from 'mysql';
import { TypeDataAction } from '../utils/Interfaces';
import db from '../config/database';
import { GetResult, PostResult } from '../utils/Types';

export default class Model {
  public static table: string;

  public static all() {
    return this._select(`SELECT * FROM ${this.table}`);
  }

  public static find(id: number) {
    return this._select(`SELECT * FROM ${this.table} WHERE id = ${id}`);
  }

  public static create(data: any): Promise<PostResult> {
    return new Promise((resolve, reject) => {
      const sql: string = `INSERT INTO ${this.table} SET ?`;
      db.query(sql, data, (err, result: PostResult) => {
        if (err) reject(err);
        console.log(`Last inserted ID: ${result.insertId}`);
        resolve(result);
      });
    });
  }

  public static update(id: number, data: TypeDataAction): Promise<unknown> {
    return new Promise((resolve, reject) => {
      const dataInfo = Object.entries(data);

      for (const [key, value] of dataInfo) {
        db.query(
          {
            sql: `UPDATE ${this.table} SET ${key} = ? WHERE id = ?`,
            values: [value, id],
          },
          (err: QueryError, result: OkPacket) => (err ? reject(err) : resolve(result.affectedRows)),
        );
      }
    });
  }

  public static delete(id: number): Promise<unknown> {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: `DELETE FROM ${this.table} WHERE id = ?`,
          values: id,
        },
        (err: QueryError, result: OkPacket) => (err ? reject(err) : resolve(result.affectedRows)),
      );
    });
  }

  private static _select(sql: string): Promise<GetResult> {
    return new Promise((resolve, reject) => {
      db.query(sql, (err: QueryError, result: GetResult) => {
        if (err) reject(err);
        if (result.length === 0) resolve(result.length);
        resolve(result);
      });
    });
  }
}
