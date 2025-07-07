// module.exports = {
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: ['**/*.js'],
//   synchronize: false,
// };
const dbConfig = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    {
      Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'db2.sqlite',
        entities: ['**/*.js'],
      });
    }
    break;

  case 'test':
    {
      Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'test.sqlite',
        entities: ['**/*.js'],
      });
    }
    break;
}

console.log('====================================');
console.log('ormconfig.js', dbConfig);
console.log('====================================');

module.exports = dbConfig;
