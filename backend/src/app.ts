import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import Knex from 'knex';
import morgan from 'morgan';
import { Model } from 'objection';
import router from './controllers';
import config from './db/db';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

const knex = Knex( config );

Model.knex( knex );

const app = express();

app.use( morgan( 'tiny' ) );
app.use( compression() );
app.use( helmet() );
app.use( express.json( { type: 'application/json' } ) );
app.use( cors() );

app.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Hello, mate! 🦘'
    } );
} )

app.use( '/api/v1', router );

app.use( notFound );
app.use( errorHandler );

export default app;