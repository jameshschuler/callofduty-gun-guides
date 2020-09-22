import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidId } from '../lib/customValidation';
import { INVALID_GAME_ID } from '../lib/messages';
import GuideService from '../services/guideService';

const router = express.Router();
const guideService = new GuideService();

router.get( '/:guideId', async ( req: express.Request, res: express.Response ) => {
    const guideId = req.params.guideId;
    if ( !isValidId( guideId ) ) {
        res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_GAME_ID( guideId ) } );
        return;
    }

    try {
        const guide = await guideService.getGuide( parseInt( guideId ) );
        res.json( guide );
    } catch ( err ) {
        res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
    }
} );

export default router;