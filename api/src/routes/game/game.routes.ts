import express from 'express';
import GameModel from './game.model';

const router = express.Router();

router.get( '/', async ( req: express.Request, res: express.Response ) => {
    const games = await GameModel.query();
    res.json( games );
} );

router.get( '/:gameId/category', async ( req: express.Request, res: express.Response ) => {
    const gameId = req.params.gameId;
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

export default router;