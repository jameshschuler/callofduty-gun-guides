import Game from '../models/game';

export default class GameService {
    constructor() {

    }

    async getGame( gameId: number ): Promise<Game> {
        const game = await Game.query().findOne( {
            game_id: gameId
        } );

        if ( !game ) {
            throw new Error( `Game not found for id: ${gameId}` );
        }

        return game;
    }
}