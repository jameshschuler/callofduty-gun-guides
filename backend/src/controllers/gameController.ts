import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidId } from '../lib/customValidation';
import { INVALID_CATEGORY_ID, INVALID_GAME_ID, INVALID_WEAPON_ID } from '../lib/messages';
import WeaponModel from '../models/weapon';
import CategoryService from '../services/categoryService';
import GameService from '../services/gameService';

export default class GameController {
    private _router: Router;
    private _gameService: GameService;
    private _categoryService: CategoryService;

    constructor( gameService: GameService, categoryService: CategoryService ) {
        this._gameService = gameService;
        this._categoryService = categoryService;

        this._router = express.Router();

        /**
         * 
         */
        this._router.get( '/', async ( req: express.Request, res: express.Response ) => {
            res.json( await this._gameService.getAll() );
        } );

        /**
         * 
         */
        this._router.get( '/:gameId/category', async ( req: express.Request, res: express.Response ) => {
            const gameId = req.params.gameId;
            if ( !isValidId( gameId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_GAME_ID( gameId ) } );
                return;
            }

            try {
                res.json( await this._gameService.getGameCategories( parseInt( gameId ) ) );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );

        /**
         * 
         */
        this._router.get( '/:gameId/category/:categoryId/weapon', async ( req: express.Request, res: express.Response ) => {
            const gameId = req.params.gameId;
            const categoryId = req.params.categoryId;

            if ( !isValidId( gameId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_GAME_ID( gameId ) } );
                return;
            }

            if ( !isValidId( categoryId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_CATEGORY_ID( categoryId ) } );
                return;
            }

            try {
                const game = await this._gameService.getGame( parseInt( gameId ) );
                const category = await this._categoryService.getCategory( parseInt( categoryId ) );

                const weapons = await WeaponModel.query()
                    .where( 'game_id', '=', game.gameId )
                    .where( 'weapon_category_id', '=', category.weaponCategoryId );
                res.json( weapons );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );

        /**
         * 
         */
        this._router.get( '/:gameId/category/:categoryId/weapon/:weaponId', async ( req: express.Request, res: express.Response ) => {
            const gameId = req.params.gameId;
            const categoryId = req.params.categoryId;
            const weaponId = req.params.weaponId;

            if ( !isValidId( gameId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_GAME_ID( gameId ) } );
                return;
            }

            if ( !isValidId( categoryId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_CATEGORY_ID( categoryId ) } );
                return;
            }

            if ( !isValidId( weaponId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_WEAPON_ID( weaponId ) } );
                return;
            }

            try {
                const game = await this._gameService.getGame( parseInt( gameId ) );
                const category = await this._categoryService.getCategory( parseInt( categoryId ) );

                const weapon = await WeaponModel.query()
                    .where( 'game_id', '=', game.gameId )
                    .where( 'weapon_category_id', '=', category.weaponCategoryId )
                    .where( 'weapon_id', '=', weaponId );
                res.json( weapon );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );

        /**
         * 
         */
        this._router.get( '/:gameId/weapon', async ( req: express.Request, res: express.Response ) => {
            const gameId = req.params.gameId;
            if ( !isValidId( gameId ) ) {
                res.status( StatusCodes.BAD_REQUEST ).json( { message: INVALID_GAME_ID( gameId ) } );
                return;
            }

            try {
                const game = await this._gameService.getGame( parseInt( gameId ) );
                const weapons = await game.$relatedQuery( 'weapons' );
                res.json( weapons );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );
    }

    public get router() {
        return this._router;
    }
}