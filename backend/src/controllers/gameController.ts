import express, { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isValidId } from '../lib/customValidation';
import { INVALID_CATEGORY_ID, INVALID_GAME_ID, INVALID_WEAPON_ID } from '../lib/messages';
import GameService from '../services/gameService';
import WeaponService from '../services/weaponService';

export default class GameController {
    private _router: Router;
    private _gameService: GameService;
    private _weaponService: WeaponService;

    constructor( gameService: GameService, weaponService: WeaponService ) {
        this._gameService = gameService;
        this._weaponService = weaponService;

        this._router = express.Router();

        /**
         * 
         */
        this._router.get( '/', async ( req: express.Request, res: express.Response ) => {
            res.json( await this._gameService.getAll() );
        } );

        /**
         * Get all weapons categories for a given game
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
         * Get all weapons of a category for a given game
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
                const weapons = await this._weaponService.getWeaponsByCategory( parseInt( gameId ), parseInt( categoryId ) );
                res.json( weapons );
            } catch ( err ) {
                res.status( StatusCodes.NOT_FOUND ).json( { message: err.message } );
            }
        } );

        /**
         * 
         */
        this._router.get( '/:gameId/category/:categoryId/weapon/:weaponId', async ( req: express.Request, res: express.Response ) => {
            const { gameId, categoryId, weaponId } = req.params;

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
                const weapon = await this._weaponService.getWeaponByCategory( parseInt( gameId ), parseInt( categoryId ), parseInt( weaponId ) );
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
                const weapons = await this._gameService.getAllWeapons( parseInt( gameId ) );
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