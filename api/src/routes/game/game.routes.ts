import express from 'express';
import validator from 'validator';
import Category from '../category/category.model';
import WeaponModel from '../weapon/weapon.model';
import GameModel from './game.model';

const router = express.Router();

/**
 * 
 */
router.get( '/', async ( req: express.Request, res: express.Response ) => {
    const games = await GameModel.query();
    res.json( games );
} );

/**
 * 
 */
router.get( '/:gameId/category', async ( req: express.Request, res: express.Response ) => {
    const gameId = req.params.gameId;
    if ( !isValidId( gameId ) ) {
        res.status( 400 ).json( { message: `Invalid game Id: ${gameId}` } );
        return;
    }

    const game = await GameModel.query().findOne( {
        game_id: gameId
    } );

    if ( game ) {
        const categories = await game.$relatedQuery( 'categories' );
        res.json( categories );
    } else {
        res.status( 404 ).json( { message: `Game not found for id: ${gameId}` } );
    }
} );

router.get( '/:gameId/category/:categoryId/weapon', async ( req: express.Request, res: express.Response ) => {
    const gameId = req.params.gameId;
    if ( !isValidId( gameId ) ) {
        res.status( 400 ).json( { message: `Invalid game Id: ${gameId}` } );
        return;
    }

    const categoryId = req.params.categoryId;
    if ( !isValidId( categoryId ) ) {
        res.status( 400 ).json( { message: `Invalid category Id: ${categoryId}` } );
        return;
    }

    const game = await GameModel.query().findOne( {
        game_id: gameId
    } );

    if ( !game ) {
        res.status( 404 ).json( { message: `Game not found for id: ${gameId}` } );
        return;
    }

    const category = await game.$relatedQuery( 'categories' )
        .findOne( 'weapon_category.weapon_category_id', '=', categoryId ) as Category;

    if ( !category ) {
        res.status( 404 ).json( { message: `Category not found for id: ${categoryId}` } );
        return;
    }

    const weapons = await WeaponModel.query()
        .where( 'game_id', '=', game.gameId )
        .where( 'weapon_category_id', '=', category.weaponCategoryId );
    res.json( weapons );
} );

/**
 * 
 */
router.get( '/:gameId/weapon', async ( req: express.Request, res: express.Response ) => {
    const gameId = req.params.gameId;
    if ( isValidId( gameId ) ) {
        res.status( 400 ).json( { message: `Invalid game Id: ${gameId}` } );
        return;
    }

    const game = await GameModel.query().findOne( {
        game_id: gameId
    } );

    if ( game ) {
        const weapons = await game.$relatedQuery( 'weapons' );
        res.json( weapons );
    } else {
        res.status( 404 ).json( { message: `Game not found for id: ${gameId}` } );
    }
} );

function isValidId( id: string ) {
    if ( !id || !validator.isNumeric( id ) ) {
        return false;
    }

    return true;
}

export default router;