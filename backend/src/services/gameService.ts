import Category from '../models/category';
import Game from '../models/game';

export default class GameService {
    constructor() {

    }

    public async getAll(): Promise<Game[]> {
        const games = await Game.query();
        return games;
    }

    public async getGame( gameId: number ): Promise<Game> {
        const game = await Game.query().findOne( {
            game_id: gameId
        } );

        if ( !game ) {
            throw new Error( `Game not found for id: ${gameId}` );
        }

        return game;
    }

    public async getGameCategories( gameId: number ): Promise<Category[]> {
        const game = await this.getGame( gameId );
        const categories = await game.$relatedQuery<Category>( 'categories' );

        return categories;
    }
}