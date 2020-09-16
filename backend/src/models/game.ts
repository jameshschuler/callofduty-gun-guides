import { Model, snakeCaseMappers } from 'objection';
import Category from './category';
import Weapon from './weapon';

export default class Game extends Model {
    gameId: number;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'game';
    }

    static jsonSchema = {
        type: 'object',
        properties: {
            game_id: { type: 'integer' }
        }
    }

    static relationMappings = {
        categories: {
            relation: Model.ManyToManyRelation,
            modelClass: Category,
            join: {
                from: 'game.game_id',
                through: {
                    // persons_movies is the join table.
                    from: 'game_weapon_category.game_id',
                    to: 'game_weapon_category.weapon_category_id'
                },
                to: 'weapon_category.weapon_category_id'
            }
        },
        weapons: {
            relation: Model.HasManyRelation,
            modelClass: Weapon,
            join: {
                from: 'game.game_id',
                to: 'weapon.game_id'
            }
        }
    };
}