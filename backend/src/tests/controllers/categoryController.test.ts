import supertest from 'supertest';
import app from '../../app';

describe( 'GET /', () => {
    it( 'should respond with an array of categories', async () => {
        const response = await supertest( app )
            .get( '/api/v1/category' )
            .expect( 'Content-Type', /json/ )
            .expect( 200 );
        expect( response.body ).toBeInstanceOf( Array );
    } );
} );