import Migrations from './Migrations';

/** use npm run migrate:drop to drop all tables */
const dropAllTables = async () => {
  await Migrations.dropAllTables();
  process.exit();
};

dropAllTables();
