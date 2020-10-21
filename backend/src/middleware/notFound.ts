import express from 'express';

function notFound ( req: express.Request, res: express.Response, next: any ) {
    const error = new Error( `Not found - ${req.originalUrl}` );
    res.status( 404 );
    next( error );
}

export default notFound;