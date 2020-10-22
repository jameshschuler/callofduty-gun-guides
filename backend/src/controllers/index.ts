import express from 'express';
import APIKeyService from '../services/apiKeyService';
import CategoryService from '../services/categoryService';
import GameService from '../services/gameService';
import GuideService from '../services/guideService';
import WeaponService from '../services/weaponService';
import APIKeyController from './apiKeyController';
import CategoryController from './categoryController';
import GameController from './gameController';
import GuideController from './guideController';
import weaponController from './weaponController';

const weaponService = new WeaponService();
const guideService = new GuideService();
const gameService = new GameService();
const categoryService = new CategoryService();
const apiKeyService = new APIKeyService();

const router = express.Router();
router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 👻',
    } );
} );

router.use( '/game', new GameController( gameService, weaponService ).router );
router.use( '/category', new CategoryController( categoryService ).router );
router.use( '/weapon', new weaponController( apiKeyService, weaponService ).router );
router.use( '/guide', new GuideController( guideService ).router );
router.use( '/apiKey', new APIKeyController( apiKeyService ).router );

export default router;