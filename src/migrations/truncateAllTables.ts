import Migrations from './Migrations';

/** use npm run migrate:fresh to reset all tables */
const truncateAllTables = async () => {
  await Migrations.truncateAllTables();
  process.exit();
};

truncateAllTables();
