import { StatusCodes } from 'http-status-codes';
import Category from '../models/category';
import Game from '../models/game';
import Weapon from '../models/weapon';
import { AppError } from '../types/errors';
import { WeaponResponse } from '../types/response/weaponResponse';

export default class GameService {
    constructor() {

    }

    public async getAll (): Promise<Game[]> {
        const games = await Game.query();
        return games;
    }

    public async getGame ( gameId: number ): Promise<Game> {
        const game = await Game.query().findOne( {
            game_id: gameId
        } );

        if ( !game ) {
            throw new AppError( `Game not found for id: ${gameId}`, StatusCodes.NOT_FOUND );
        }

        return game;
    }

    public async getGameCategories ( gameId: number ): Promise<string[]> {
        const game = await this.getGame( gameId );
        const categories = await game.$relatedQuery<Category>( 'categories' );

        return categories.map( e => e.name );
    }

    public async getAllWeapons ( gameId: number ): Promise<WeaponResponse[]> {
        const game = await this.getGame( gameId );
        const weapons = await game.$relatedQuery<Weapon>( 'weapons' );

        return weapons.map( e => { return { name: e.name, unlockLevel: e.unlockLevel } } ) as WeaponResponse[];
    }
}