import express from 'express';
import CategoryModel from './category.model';

const router = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response ) => {
    const categories = await CategoryModel.query();
    res.json( categories );
} );

export default router;