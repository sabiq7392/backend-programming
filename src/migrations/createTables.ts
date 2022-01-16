import Migrations from './Migrations';

/** use npm run migrate:create to create table in */
const createTables = async () => {
  /** @patients */
  await Migrations.createTable(
    `
    CREATE TABLE patients
    (
      id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      address TEXT NOT NULL,
      status ENUM("positive", "recovered", "dead") NOT NULL,
      in_date_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
      out_date_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP(),
      timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `,
  );
  
  /** @users */
  await Migrations.createTable(
    `
    CREATE TABLE users
    (
      id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP()
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `,
  );

  process.exit();
};

createTables();
