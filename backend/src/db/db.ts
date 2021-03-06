import { PgConnectionConfig } from 'knex';
import path from 'path';

require( 'dotenv' ).config( { path: path.resolve( __dirname, '../../.env' ) } );

const config = {
    development: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
            database: process.env.POSTGRES_DB,
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT,
            host: process.env.POSTGRES_HOST,
            ssl: true
        } as PgConnectionConfig
    },
    production: {
        client: 'pg',
        useNullAsDefault: true,
        connection: process.env.DATABASE_URL
    },
    test: {
        client: 'pg',
        useNullAsDefault: true,
        connection: {
            database: process.env.TEST_POSTGRES_DB,
            user: process.env.TEST_POSTGRES_USER,
            password: process.env.TEST_POSTGRES_PASSWORD,
            port: process.env.TEST_POSTGRES_PORT,
            host: process.env.TEST_POSTGRES_HOST,
        } as PgConnectionConfig
    }
} as any[ string ];

const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[ environment ];

export default connectionConfig;