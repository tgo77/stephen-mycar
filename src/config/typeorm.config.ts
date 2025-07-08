import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

// console.log('====================================');
// console.log(process.env);
// console.log('====================================');

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'my-car',
      username: 'postgres',
      password: '13151315',

      entities: [__dirname + '/../**/*.entity{.ts,.js}'],

      migrations: [__dirname + '/../migrations/*{.ts, .js}'],
      migrationsTableName: 'migrations',
      // ssl: {
      //   rejectUnauthorized: false,
      // },

      synchronize: false,
      logging: true,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  database: 'my-car',
  username: 'postgres',
  password: '13151315',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  migrations: [__dirname + '/../migrations/*{.ts, .js}'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
};

// export default class TypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmConfig {
//     return {
//       type: 'sqlite',
//       database: 'db.sqlite',
//       entities: [__dirname + '/../**/*.entity{.ts, js}'],
//       logging: true,
//     };
//   }
// }
