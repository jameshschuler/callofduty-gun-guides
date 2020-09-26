import express, { Router } from 'express';
import CategoryService from 'src/services/categoryService';

export default class CategoryController {
    private _router: Router;
    private _categoryService: CategoryService;

    constructor( categoryService: CategoryService ) {
        this._categoryService = categoryService;
        this._router = express.Router();

        this._router.get(
            '/',
            async ( req: express.Request, res: express.Response ) => {
                res.json( await this._categoryService.getAll() );
            }
        );
    }

    public get router () {
        return this._router;
    }
}