import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

const dbConfig = {
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*'],
  migrationsRun: true,
  cli: {
    migrationsDir: 'migrations',
  },
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
      migrationRun: true,
    });
  }
}

const config = {
  ...dbConfig,
};
console.log('====================================');
console.log(config);
console.log('====================================');

export default config;
