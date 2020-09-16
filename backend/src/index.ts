import app from './app';
import logger from './lib/logger';

const port = process.env.PORT || 5000;
app.listen( port, () => {
  logger.info( `Listening at http://localhost:${port}` );
} );