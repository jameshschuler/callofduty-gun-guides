import supertest from 'supertest';
import app from '../app';

describe( 'GET weapon/:weaponId/attachment', () => {
    it( 'should respond with an array of weapon attachments', async () => {
        const weaponId = 1;
        const response = await supertest( app )
            .get( `/api/v1/weapon/${weaponId}/attachment` )
            .expect( 'Content-Type', /json/ )
            .expect( 200 );
        expect( response.body ).toBeInstanceOf( Array );
    } );

    it( 'should respond with weapon not found error', async () => {
        const weaponId = 999;
        const response = await supertest( app )
            .get( `/api/v1/weapon/${weaponId}/attachment` )
            .expect( 'Content-Type', /json/ )
            .expect( 404 );

        expect( response.body ).toBeInstanceOf( Object );
        expect( response.body.message ).toBe( `Weapon not found for id: ${weaponId}` );
    } );

    it( 'should respond with invalid weapon id error', async () => {
        const weaponId = -1;
        const response = await supertest( app )
            .get( `/api/v1/weapon/${weaponId}/attachment` )
            .expect( 'Content-Type', /json/ )
            .expect( 400 );

        expect( response.body ).toBeInstanceOf( Object );
        expect( response.body.message ).toBe( `Invalid weapon Id: ${weaponId}` );
    } );
} );