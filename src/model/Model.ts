import { TypeData } from '../utils/Interface';
import db from '../config/database';

export default class Model {
  static table: string;

  public static all() {
    return this._selectData(`SELECT * FROM ${this.table}`);
  }

  public static find(id: number) {
    return this._selectData(`SELECT * FROM ${this.table} WHERE id = ${id}`);
  }

  public static create(data: TypeData) {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: `INSERT INTO ${this.table} SET ?`,
          values: data,
        },
        (err, result) => {
          console.log(`Last inserted ID: ${result.insertId}`);
          return err ? reject(err) : resolve(result);
        },
      );
    });
  }

  public static update(id: number, data: TypeData) {
    return new Promise((resolve, reject) => {
      const dataInfo = Object.entries(data);

      for (const [key, value] of dataInfo) {
        db.query(
          {
            sql: `UPDATE ${this.table} SET ${key} = ? WHERE id = ?`,
            values: [value, id],
          },
          (err, result) => (err ? reject(err) : resolve(result.affectedRows)),
        );
      }
    });
  }

  public static delete(id: number) {
    return new Promise((resolve, reject) => {
      db.query(
        {
          sql: `DELETE FROM ${this.table} WHERE id = ?`,
          values: id,
        },
        (err, result) => (err ? reject(err) : resolve(result.affectedRows)),
      );
    });
  }

  private static _selectData(sql: string) {
    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) reject(err);

        if (result.length === 0) {
          resolve(result.length);
        }

        resolve(result);
      });
    });
  }
}
