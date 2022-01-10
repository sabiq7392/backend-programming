import { DataAction } from '../config/ResultInterfaces';
import db from '../config/database';
import { GetResult, PostResult } from '../config/PromiseType';

/**
 * !Important extend this to your Custom Model
 * dont change this unless you wanna touch more
 *
 * if you extend this model to your Custom Model
 * you can call ex: Patient.all()
 */

/**
 * For method find
 * you can use too for params in your other method
 */
export interface Find {
  [key: string]: string | number;
}

export default class Model {
  public static table: string;

  public static all() {
    return this._select(`SELECT * FROM ${this.table}`);
  }

  public static find(data: Find) {
    const key = Object.keys(data);
    const value = Object.values(data);

    return this._select(`SELECT * FROM ${this.table} WHERE ${key} = "${value}"`);
  }

  public static create(data: DataAction): Promise<PostResult | GetResult> {
    return new Promise((resolve, reject) => {
      const sql: string = `INSERT INTO ${this.table} SET ?`;

      db.query(sql, data, (err, result: PostResult) => {
        if (err) reject(err);
        if (result) resolve(this.find({ data: result.insertId }));
      });
    });
  }

  public static update(id: number, data: DataAction): Promise<PostResult | GetResult> {
    return new Promise((resolve, reject) => {
      const sql: string = `UPDATE ${this.table} SET ? WHERE id = ?`;

      db.query(sql, [data, id], (err, result) => {
        if (err) reject(err);
        if (result) resolve(this.find({ id }));
      });
    });
  }

  public static delete(id: number) {
    return new Promise((resolve, reject) => {
      const sql: string = `DELETE FROM ${this.table} WHERE id = ${id}`;

      db.query(sql, (err, result: PostResult) => {
        if (err) reject(err);
        if (result) resolve(result);
      });
    });
  }

  protected static _select(sql: string): Promise<GetResult> {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result: GetResult) => {
        if (err) reject(err);
        if (result.length === 0) resolve(result.length);
        if (result) resolve(result);
      });
    });
  }
}
