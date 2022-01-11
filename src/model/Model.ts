import DataWillSent from '../config/DataWillSentInterfaces';
import { GetResult, PostResult, PromiseGet, PromisePost } from '../config/ResultTypes';
import db from '../config/database';

/**
 *
 * @IMPORTANT
 * @desc extend this to your Custom Model
 * dont change this unless you wanna touch more
 *
 * if you extend this model to your Custom Model
 * you can call anywhere,
 * @example await Patient.all()
 */

/**
 *
 * @desc For method find
 * you can use too for params in your other method
 */
export interface Find {
  [key: string]: string | number;
}

export default class Model {
  /**
   *
   * @IMPORTANT
   * @desc Make too in your custom model and
   * @set the value based on your table name
   * @property for access your table.
   * so becareful!
   */
  public static table: string;

  /**
   *
   * @desc search all data in database wheter is empty or not
   * @example call in controllers "await Patient.all()"
   * @returns data in database, truthy & falsy condition, and errors
   */
  public static all() {
    return this._select(`SELECT * FROM ${this.table}`);
  }

  /**
   *
   * @desc for search all data in database based by your "key" and "value" ,
   * @param data send as request
   * @example call in controllers "await Patient.find(res, { nama: 'Sabiq' }")
   * @returns data in database, "truthy" & "falsy" condition, and errors
   */
  public static find(data: Find) {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    if (typeof value === 'string') {
      return this._select(`SELECT * FROM ${this.table} WHERE ${key} = "${value}"`);
    }
    return this._select(`SELECT * FROM ${this.table} WHERE ${key} = ${value}`);
  }

  /**
   *
   * @desc for create data in database based by request
   * @param data send as request
   * @example call in controllers "await Patient.create(req.body)"
   * @returns last created data and erorrs
   */
  public static create(data: DataWillSent): PromisePost {
    return new Promise((resolve, reject) => {
      const sql: string = `INSERT INTO ${this.table} SET ?`;

      db.query(sql, data, (err, result: PostResult) => {
        if (err) reject(err);
        if (result) resolve(this.find({ id: result.insertId }));
      });
    });
  }

  /**
   *
   * @desc
   * @param id is data id
   * @param data send as request
   * @example call it in controllers "await Patient.update(id, req.body)"
   * @returns
   */
  public static update(id: number, data: DataWillSent): PromisePost {
    return new Promise((resolve, reject) => {
      const sql: string = `UPDATE ${this.table} SET ? WHERE id = ?`;

      db.query(sql, [data, id], (err, result) => {
        if (err) reject(err);
        if (result) resolve(this.find({ id }));
      });
    });
  }

  /**
   *
   * @desc
   * @param id is data id
   * @param data send as request
   * @example call in controllers "await Patient.delete(id)"
   * @returns
   */
  public static delete(id: number) {
    return new Promise((resolve, reject) => {
      const sql: string = `DELETE FROM ${this.table} WHERE id = ${id}`;

      db.query(sql, (err, result: PostResult) => {
        if (err) reject(err);
        if (result) resolve(result);
      });
    });
  }

  /**
   *
   * @desc get the result by SELECT data
   * you can reuse it if you build another method to "SELECT" data
   *
   * @dont delete the "result.length", this make you get the condition or length,
   * whether is true, false, or number.
   *
   * @condition Why there is a condition result.length || 0?
   *
   * because without 0 you can't use operator "!" to make condition falsy
   * you have to do, ex: "patient.length === 0" to get falsy
   * and is not good cause sometime make lack of readability
   *
   * @param sql code SQL
   * @example call in this class "this._select('SELECT * FROM table WHERE ...')"
   * @returns data in database, "truthy" & "falsy" condition, and errors
   */
  private static _select(sql: string): PromiseGet {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result: GetResult) => {
        if (err) reject(err);
        if (result.length === 0) resolve(result.length || 0);
        if (result) resolve(result);
      });
    });
  }
}
