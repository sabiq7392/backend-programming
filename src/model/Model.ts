/* eslint-disable max-len */
import { AuthDataWillSent, MainDataWillSent } from '../config/DataWillSentInterfaces';
import { GetOne, GetResult, PostResult, PromiseGet, PromiseGetOne, PromisePost } from '../config/ResultTypes';
import db from '../config/database';

/**
 *
 * @IMPORTANT
 * @should extend this to your Custom Model
 * dont change this unless you wanna touch more
 *
 * if you extend this model and set property of table to your Custom Model
 * you can call anywhere,
 * @example await Patient.all(), etc
 */

/**
 *
 * @desc For method find
 * you can use too for params in your other method
 */
export interface Find {
  [key: string]: any;
}

/** @desc for method _query */
interface Query {
  sql: string,
  values?: any,
  callback: Function,
}

export default class Model {
  /**
   * @table
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
  public static all(): PromiseGet {
    return this._query({
      sql: `SELECT * FROM ${this.table}`,
      callback: (results: GetResult) => results,
    });
  }

  /**
   * @find
   * @desc search "all data" in database based by your "key" and "value" ,
   * @param data send as request
   * @example call in controllers "await Patient.find({ nama: 'Sabiq' })
   * @returns all data in database, "truthy" & "falsy" condition, and errors
   */
  public static find(data: Find): PromiseGet {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    return this._query({
      sql: `SELECT * FROM ${this.table} WHERE ${key} = ${`"${value}"` || value}`,
      callback: (results: GetResult) => results,
    });
  }

  /**
   * @findOne
   * @desc search "one data" in database based by your "key" and "value"
   * @param data send as request
   * @example call in controllers "or await Patient.findOne({ id: 1 })"
   * @returns one data, "truthy" & "falsy" condition, and errors
   */
  public static findOne(data: Find): PromiseGetOne {
    const key = Object.keys(data)[0];
    const value = Object.values(data)[0];

    return this._query({
      sql: `SELECT * FROM ${this.table} WHERE ${key} = ${`"${value}"` || value}`,
      callback: (result: GetOne) => result[0],
    });
  }

  /**
   * @create
   * @desc create data in database based by request
   * @param data send as request
   * @example call in controllers "await Patient.create(req.body)"
   * with custom type parameter "await Patient.create<DataPayment>(req.body)"
   * @returns last created data and erorrs
   */
  public static create<T>(data: MainDataWillSent | AuthDataWillSent | T): PromisePost {
    // sql, data, (result: PostResult) => this.find({ id: result.insertId })
    return this._query({
      sql: `INSERT INTO ${this.table} SET ?`,
      values: data,
      callback: (result: PostResult) => this.find({ id: result.insertId }),
    });
  }

  /**
   * @update
   * @desc update data in database wheter it send partials or all
   * @param id data id
   * @param data send as request
   * @example call it in controllers "await Patient.update(id, req.body)"
   * with custom type parameter "await Patient.update<DataPayment>(id, req.body)"
   * @returns last updated data and errors
   */
  public static update<T>(id: number, data: MainDataWillSent | AuthDataWillSent | T): PromisePost {
    return this._query({
      sql: `UPDATE ${this.table} SET ? WHERE id = ?`,
      values: [data, id],
      // eslint-disable-next-line no-unused-vars
      callback: (result: PostResult) => this.findOne({ id }),
    });
  }

  /**
   * @delete
   * @desc delete data in database
   * @param id is data id
   * @param data send as request
   * @example call in controllers "await Patient.delete(id)"
   * @returns information about rows in database and errors
   */
  public static delete(id: number): PromisePost {
    return this._query({
      sql: `DELETE FROM ${this.table} WHERE id = ${id}`,
      callback: (results: PostResult) => results,
    });
  }

  /**
   * @_query
   * @desc shortcut for promise and db.query it make less redundant code
   * @condition Why there is a condition result.length || 0?
   *
   * @dont delete the "result.length", this make you get the condition or length,
   * whether is true, false, or number.
   *
   * because without 0 you can't use operator "!" to make condition falsy
   * you have to do, ex: "patient.length === 0" to get falsy
   * and is not good cause sometime make lack of readability
   *
   * @param sql code SQL
   * @example call in this class "this._select('SELECT * FROM table WHERE ...')"
   * @returns data in database, "truthy" & "falsy" condition, and errors
   */
  private static _query(query: Query): Promise<any> {
    const { sql, values, callback } = query;

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, results: any) => {
        if (err) reject(err);

        const notFound = results.length === 0;
        if (notFound) resolve(results.length || 0);

        if (results && callback) resolve(callback(results));
      });
    });
  }
}
