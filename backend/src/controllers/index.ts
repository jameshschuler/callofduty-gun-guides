import express from 'express';
import categoryController from './categoryController';
import gameController from './gameController';
import guideController from './guideController';
import weaponController from './weaponController';

const router = express.Router();

router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 🐼',
    } );
} );

router.use( '/game', gameController );
router.use( '/category', categoryController );
router.use( '/weapon', weaponController );
router.use( '/guide', guideController );

export default router;