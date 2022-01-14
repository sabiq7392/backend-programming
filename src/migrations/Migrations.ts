import db from '../config/database';
import { PostResult, PromisePost } from '../config/ResultTypes';

export default class Migrations {
  /** Generate table along with row to database */
  public static async createTable(table: string, row: any[]): Promise<any> {
    const sql: string = `CREATE TABLE ${table} (${this._createRow(row)})`;

    await this._query(sql, (result: PromisePost) => console.log(result));
    process.exit();
  }

  /** create row table */
  private static _createRow(values: any[]): string[] {
    return values.map((value: any) => {
      const { name, type, len } = value;

      return ` ${name} ${type.toUpperCase()}(${len})`;
    });
  }

  /** query to database */
  private static _query(sql: string, callback: Function): Promise<PostResult> {
    return new Promise((resolve, reject) => {

      db.query(sql, (err, result) => {
        if (err) { reject(err); }
        if (result) { resolve(callback(result)); }
      });

    });
  }
}
