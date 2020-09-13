import express from 'express';
import categoryRoutes from './category/category.routes';
import gameRoutes from './game/game.routes';

const router = express.Router();

router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 🐼',
    } );
} );

router.use( '/game', gameRoutes );
router.use( '/category', categoryRoutes );
// router.use('/auth', auth);
// router.use('/addresses', addresses);
// router.use('/companies', companies);
// router.use('/items', items);

export default router;