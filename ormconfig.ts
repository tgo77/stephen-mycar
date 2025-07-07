import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const dbConfig = {
  synchronize: false,
};

switch (process.env.NODE_ENV) {
  case 'development':
    {
      Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'db.sqlite',
        entities: ['**/*.entity.js'],
      });
    }
    break;
  case 'test': {
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['**/*.entity.ts'],
    });
  }
}

const config: TypeOrmModuleOptions = {};
console.log('====================================');
console.log(dbConfig);
console.log('====================================');

export = dbConfig;
