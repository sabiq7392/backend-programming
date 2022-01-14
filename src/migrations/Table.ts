import Migrations from './Migrations';

Migrations.createTable('test4', [
  {
    name: 'id',
    type: 'int',
    len: 200,
  },
  {
    name: 'name',
    type: 'varchar',
    len: 255,
  },
  {
    name: 'phone',
    type: 'varchar',
    len: 255,
  },
  {
    name: 'address',
    type: 'varchar',
    len: 255,
  },
  {
    name: 'status',
    type: 'varchar',
    len: 45,
  },
]);
