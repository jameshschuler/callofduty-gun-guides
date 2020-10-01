import { StatusCodes } from 'http-status-codes';
import { QueryBuilder } from 'objection';
import APIKey from '../../models/apiKey';
import APIKeyService from '../../services/apiKeyService';

function getAPIKey() {
    return {
        username: 'bobbysmith',
        apiKey: 'testinganapikey',
        isAdmin: false,
        expirationDate: new Date()
    }
}

let existingApiKey: any;
let apiKeyService: APIKeyService;

describe( 'APIKeyService tests', () => {
    beforeEach( () => {
        existingApiKey = getAPIKey();
        apiKeyService = new APIKeyService();
    } );

    it( 'it should verify the api key successful', async () => {
        const query = QueryBuilder.forClass<APIKey>( APIKey )

        jest.spyOn( APIKey, 'query' ).mockReturnValue( query )

        const queryBuilder = query.resolve( existingApiKey );
        const findOne = jest.spyOn( queryBuilder, 'findOne' )

        await apiKeyService.verifyAPIKey( existingApiKey.apiKey );

        expect( findOne ).toHaveBeenCalledTimes( 1 );
    } );

    it( 'it should fail due to nonexistent key', async () => {
        const query = QueryBuilder.forClass<APIKey>( APIKey )

        jest.spyOn( APIKey, 'query' ).mockReturnValue( query )

        query.resolve( existingApiKey );

        try {
            await apiKeyService.verifyAPIKey( 'somethingelsecrazy' );
        } catch ( err ) {
            expect( err.message ).toBe( 'Invalid API key' );
            expect( err.statusCode ).toBe( StatusCodes.BAD_REQUEST );
        }
    } );

    it( 'it should fail due to expired api key', async () => {
        existingApiKey.expirationDate = new Date( '2020/09/01' );
        const query = QueryBuilder.forClass<APIKey>( APIKey )

        jest.spyOn( APIKey, 'query' ).mockReturnValue( query )

        query.resolve( existingApiKey );

        try {
            await apiKeyService.verifyAPIKey( existingApiKey.apiKey );
        } catch ( err ) {
            expect( err.message ).toBe( 'API key has expired.' );
            expect( err.statusCode ).toBe( StatusCodes.FORBIDDEN );
        }
    } );

    it( 'it should fail for create (not admin)', async () => {
        const query = QueryBuilder.forClass<APIKey>( APIKey );

        jest.spyOn( APIKey, 'query' ).mockReturnValue( query )

        query.resolve( existingApiKey );

        try {
            await apiKeyService.verifyAPIKey( existingApiKey.apiKey, true );
        } catch ( err ) {
            expect( err.message ).toBe( 'Invalid API key.' );
            expect( err.statusCode ).toBe( StatusCodes.BAD_REQUEST );
        }
    } );

    it( 'it should pass for create (admin)', async () => {
        const query = QueryBuilder.forClass<APIKey>( APIKey );

        jest.spyOn( APIKey, 'query' ).mockReturnValue( query )

        existingApiKey.isAdmin = true;
        query.resolve( existingApiKey );

        await apiKeyService.verifyAPIKey( existingApiKey.apiKey, true );
    } );
} );