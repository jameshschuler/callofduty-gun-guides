import supertest from 'supertest';
import app from '../app';

describe( 'GET /', () => {
    it( 'should respond with a message', async () => {
        const response = await supertest( app )
            .get( '/' )
            .expect( 'Content-Type', /json/ )
            .expect( 200 );

        expect( response.body.message ).toEqual( 'Hello, mate! 🦘' );
    } );

    it( 'should respond with a message', async () => {
        const response = await supertest( app )
            .get( '/api/v1' )
            .expect( 'Content-Type', /json/ )
            .expect( 200 );

        expect( response.body.message ).toEqual( 'Welcome! 🐼' );
    } );
} );