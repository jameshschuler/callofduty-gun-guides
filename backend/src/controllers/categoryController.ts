import express, { Router } from 'express';
import Category from '../models/category';

export default class CategoryController {
    private _router: Router;

    constructor() {
        this._router = express.Router();

        this._router.get(
            '/',
            async ( req: express.Request, res: express.Response ) => {
                const categories = await Category.query();
                res.json( categories );
            }
        );
    }

    public get router () {
        return this._router;
    }
}