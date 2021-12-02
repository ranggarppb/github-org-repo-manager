import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

import { PROD_ENV } from '../constants';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// FOR GOOGLE CLOUD SQL
if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === PROD_ENV) {
  config.host = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host || 'localhost',
  port: 5432,
  username: config.user || 'postgres',
  password: config.password || 'postgres',
  database: config.database || 'my_database',
  ssl:
    process.env.NODE_ENV === PROD_ENV ? { rejectUnauthorized: false } : false,
  entities: ['dist/**/entities/*.entity{.ts,.js}'],
  // We are using migrations, synchronize should be set to false.
  synchronize: false,
  dropSchema: false,
  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = connectionOptions;
