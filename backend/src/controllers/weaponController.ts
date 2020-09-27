import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidId } from '../lib/customValidation';
import { INVALID_WEAPON_ID } from '../lib/messages';
import WeaponService from '../services/weaponService';

export default class WeaponController {
    private _router: Router;
    private _weaponService: WeaponService;


    constructor( weaponService: WeaponService ) {
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
    }

    public get router() {
        return this._router;
    }
}