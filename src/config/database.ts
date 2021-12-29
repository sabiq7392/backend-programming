import mysql from 'mysql';

require('dotenv').config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${db.threadId}`);
});

export default db;
