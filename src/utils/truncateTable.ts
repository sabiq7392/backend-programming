import express, { Application } from 'express';
import db from '../config/database';

const truncate = () => {
  return new Promise((resolve, reject) => {
    db.query('TRUNCATE TABLE patients', (err, result) => {
      if (err) reject(err);
      if (result) resolve(result);
    });
  });
};

truncate();
// const app: Application = express();
// app.use(truncate);
