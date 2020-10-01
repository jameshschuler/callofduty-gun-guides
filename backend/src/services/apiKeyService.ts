import bcrypt from 'bcrypt';
import cryptoRandomString from 'crypto-random-string';
import { StatusCodes } from 'http-status-codes';
import validator from 'validator';
import APIKey from '../models/apiKey';
import { AppError } from '../types/errors';
import { GenerateAPIKeyRequest } from '../types/request/generateAPIKeyRequest';
import { GenerateAPIKeyResponse } from '../types/response/generateAPIKeyResponse';

export default class APIKeyService {
    public async generateAPIKey( { username }: GenerateAPIKeyRequest ): Promise<GenerateAPIKeyResponse> {
        if ( validator.isEmpty( username ) ) {
            throw new AppError( `Must enter a username`, StatusCodes.BAD_REQUEST );
        }

        const existingAPIKey = await APIKey.query().findOne( { username } )
        if ( existingAPIKey ) {
            throw new AppError( `API key for user already exists!`, StatusCodes.CONFLICT );
        }

        try {
            const randoString = cryptoRandomString( { type: 'url-safe', length: 25 } );
            const hash = await bcrypt.hash( randoString, 10 );

            const apiKey = await APIKey.query().insert( {
                username,
                apiKey: hash,
                isAdmin: false,
                expirationDate: new Date( new Date().setFullYear( new Date().getFullYear() + 1 ) )
            } );

            return {
                apiKey: apiKey.apiKey,
                username: apiKey.username,
                expirationDate: apiKey.expirationDate
            } as GenerateAPIKeyResponse;
        } catch ( err ) {
            throw new AppError( 'Something went wrong! Please try again later.', StatusCodes.INTERNAL_SERVER_ERROR )
        }
    }

    public async verifyAPIKey( apiKey: string, forCreate: boolean = false ) {
        const existingAPIKey = await APIKey.query().findOne( { api_key: apiKey } );

        if ( !existingAPIKey ) {
            throw new AppError( 'Invalid API key.', StatusCodes.BAD_REQUEST );
        }

        if ( validator.isAfter( new Date().toString(), existingAPIKey.expirationDate.toString() ) ) {
            throw new AppError( 'API key has expired.', StatusCodes.FORBIDDEN );
        }

        if ( forCreate ) {
            if ( !existingAPIKey.isAdmin ) {
                throw new AppError( 'Invalid API key.', StatusCodes.BAD_REQUEST );
            }
        }
    }
}