import express from 'express';
import WeaponService from '../services/weaponService';
import CategoryController from './categoryController';
import gameController from './gameController';
import guideController from './guideController';
import weaponController from './weaponController';

const router = express.Router();
const weaponService = new WeaponService();

router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 🐼',
    } );
} );

router.use( '/game', gameController );
router.use( '/category', new CategoryController().router );
router.use( '/weapon', new weaponController( weaponService ).router );
router.use( '/guide', guideController );

export default router;