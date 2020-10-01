import { Router } from 'express';

export class BaseController {
    private _router: Router;

    constructor( router: Router ) {
        this._router = router;
    }

    public get router() {
        return this._router;
    }
}