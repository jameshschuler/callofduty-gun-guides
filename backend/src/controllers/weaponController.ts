import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidId } from '../lib/customValidation';
import { INVALID_WEAPON_ID } from '../lib/messages';
import WeaponService from '../services/weaponService';

const router = express.Router();
const weaponService = new WeaponService();

/**
 * 
 */
router.get( '/:weaponId/attachment', async ( req: express.Request, res: express.Response ) => {
    const weaponId = req.params.weaponId;
    if ( !isValidId( weaponId ) ) {
        res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_WEAPON_ID( weaponId ) } );
        return;
    }

    try {
        const weaponAttachments = await weaponService.getWeaponAttachments( parseInt( weaponId ) );
        res.json( weaponAttachments );
    } catch ( err ) {
        res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
    }
} );

export default router;