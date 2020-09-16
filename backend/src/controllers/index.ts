import express from 'express';
import categoryController from './categoryController';
import gameController from './gameController';

const router = express.Router();

router.get( '/', ( req: express.Request, res: express.Response ) => {
    res.json( {
        message: 'Welcome! 🐼',
    } );
} );

router.use( '/game', gameController );
router.use( '/category', categoryController );
// router.use('/auth', auth);
// router.use('/addresses', addresses);
// router.use('/companies', companies);
// router.use('/items', items);

export default router;