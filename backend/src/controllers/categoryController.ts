import express from 'express';
import Category from '../models/category';

const router = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response ) => {
    const categories = await Category.query();
    res.json( categories );
} );

export default router;