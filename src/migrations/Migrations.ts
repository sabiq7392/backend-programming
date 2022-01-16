import db from '../config/database';
import { PromisePost, PromiseGet, GetResult, PostResult } from '../config/ResultTypes';

export default class Migrations {
  /** accessor table in database */
  public static tableInDatabase: string = `Tables_in_${process.env.DB_DATABASE}`;

  /** create table */
  public static async createTable(sql: string): PromisePost {
    return this._query(sql, (result: PromisePost) => console.log(result));
  }

  /** drop all tables in database */
  public static async dropAllTables(): PromisePost {
    const tables = await this._getAllTables();
    const allTables = tables.map((table: any) => table[this.tableInDatabase]);

    return this._query(
      `DROP TABLE ${allTables}`, 
      (results: PostResult) => console.log(results),
    );
  } 

  /** truncate all tables in database */
  public static async truncateAllTables() {
    const allTables = await this._getAllTables();

    return new Promise((resolve, reject) => {
      allTables.forEach((table: any) => {

        db.query(`TRUNCATE TABLE ${table[this.tableInDatabase]}`, (err, result: PostResult) => {
          if (err) reject(err);
          if (result) resolve(result);
        });

      });
    });
  } 

  /** show all tables in database */
  public static showAllTables(): PromiseGet {
    return this._query(
      'SHOW TABLES',
      (results: GetResult) => console.log(results),
    );
  } 

  /** get all tables in database */
  private static _getAllTables(): PromiseGet {

    return this._query(
      'SHOW TABLES', 
      (results: GetResult) => results,
    );
  }

  /** query to database */
  private static _query(_sql: string, _resolve: Function): Promise<any> {
    return new Promise((resolve, reject) => {

      db.query(_sql, (err, result) => {
        if (err) reject(err);
        if (result) resolve(_resolve(result));
      });

    });
  }
}
