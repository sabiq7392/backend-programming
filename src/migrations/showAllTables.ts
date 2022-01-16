import Migrations from './Migrations';

const showAllTables = async () => {
  await Migrations.showAllTables();
  process.exit();
};

showAllTables();
