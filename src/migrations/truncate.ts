/* eslint-disable no-new */
import db from '../config/database';
import { GetResult, PostResult, PromisePost, PromiseGet } from '../config/ResultTypes';

/** use npm run migrate:fresh to reset table */
class TruncateTable {
  constructor() {
    this.processing();
  }

  private async processing(): Promise<void> {
    await this.reset(await this.show());
    process.exit();
  }

  private reset(tables: any): PromisePost {
    return new Promise((resolve, reject) => {
      tables.forEach((table: any) => {
        db.query(`TRUNCATE TABLE ${table.Tables_in_covid_patients}`, (err, result: PostResult) => {
          if (err) reject(err);
          if (result) {
            resolve(result);
          }
        });
      });
    });
  }

  private show(): PromiseGet {
    return new Promise((resolve, reject) => {
      db.query('SHOW TABLES', (err, results: GetResult) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
    });
  }
}

new TruncateTable();
