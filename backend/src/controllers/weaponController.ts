import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import APIKeyService from 'src/services/apiKeyService';
import { CreateWeaponRequest } from 'src/types/request/createWeaponRequest';
import { isValidId } from '../lib/customValidation';
import { INVALID_API_KEY, INVALID_WEAPON_ID } from '../lib/messages';
import WeaponService from '../services/weaponService';

export default class WeaponController {
    private _router: Router;
    private _apiKeyService: APIKeyService;
    private _weaponService: WeaponService;


    constructor( apiKeyService: APIKeyService, weaponService: WeaponService ) {
        this._apiKeyService = apiKeyService;
        this._weaponService = weaponService;
        this._router = express.Router();

        this._router.get( '/:weaponId/attachment', async ( req: express.Request, res: express.Response ) => {
            const { weaponId } = req.params;
            if ( !isValidId( weaponId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_WEAPON_ID( weaponId ) } );
                return;
            }

            try {
                const weaponAttachments = await this._weaponService.getWeaponAttachments( parseInt( weaponId ) );
                res.json( weaponAttachments );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );

        this._router.get( '/:weaponId/guide', async ( req: express.Request, res: express.Response ) => {
            const weaponId = req.params.weaponId;
            if ( !isValidId( weaponId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_WEAPON_ID( weaponId ) } );
                return;
            }

            const weaponGuides = await this._weaponService.getWeaponGuides( parseInt( weaponId ) );
            res.json( weaponGuides );
        } );

        this._router.post( '/', async ( req: express.Request, res: express.Response ) => {
            if ( !req.headers.api_key ) {
                res.status( StatusCodes.FORBIDDEN ).json( { message: INVALID_API_KEY } );
                return;
            }

            try {
                await this._apiKeyService.verifyAPIKey( req.headers.api_key as string, true );
                const { gameId, weaponCategoryId, weaponId } = await this._weaponService.createWeapon( req.body as CreateWeaponRequest );

                res
                    .location( `/game/${gameId}/category/${weaponCategoryId}/weapon/${weaponId}` )
                    .status( StatusCodes.CREATED ).json();
            } catch ( err ) {
                res.status( err.statusCode ).json( { message: err.message } );
            }
        } );
    }

    public get router() {
        return this._router;
    }
}