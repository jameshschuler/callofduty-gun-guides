import express from 'express';

const errorTypes: any[ number ] = {
    ValidationError: 422,
    UniqueViolationError: 409,
};

const errorMessages: any[ string ] = {
    UniqueViolationError: 'Already exists.',
};

interface CustomError extends Error {
    errors: any;
}

function errorHandler( error: CustomError, req: express.Request, res: express.Response, next: any ) {
    const statusCode = res.statusCode === 200 ? errorTypes[ error.name ] || 500 : res.statusCode;
    res.status( statusCode );
    res.json( {
        status: statusCode,
        message: errorMessages[ error.name ] || error.message,
        stack: process.env.NODE_ENV === 'production' ? '🍍' : error.stack,
        errors: error.errors || undefined,
    } );
}

export default errorHandler;