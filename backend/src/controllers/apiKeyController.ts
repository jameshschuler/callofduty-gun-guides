import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { INVALID_API_KEY } from '../lib/messages';
import APIKeyService from '../services/apiKeyService';
import { GenerateAPIKeyRequest } from '../types/request/generateAPIKeyRequest';
import { BaseController } from './baseController';

export default class APIKeyController extends BaseController {
    private _apiKeyService: APIKeyService;

    constructor( apiKeyService: APIKeyService ) {
        super( express.Router() );

        this._apiKeyService = apiKeyService;
        this.router.get(
            '/',
            async ( req: express.Request, res: express.Response ) => {
                res.json( { message: '🤫' } );
            }
        );

        this.router.post( '/', async ( req: express.Request, res: express.Response ) => {
            if ( !req.headers.api_key ) {
                res.status( StatusCodes.FORBIDDEN ).json( { message: INVALID_API_KEY } );
                return;
            }

            try {
                await this._apiKeyService.verifyAPIKey( req.headers.api_key as string, true );

                const response = await this._apiKeyService.generateAPIKey( req.body as GenerateAPIKeyRequest );

                res.status( StatusCodes.CREATED ).json( { message: '🤫', ...response } );
            } catch ( err ) {
                res.status( err.statusCode ).json( { message: err.message } );
            }
        } );
    }
}