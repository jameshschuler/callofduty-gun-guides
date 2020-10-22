import { Model, snakeCaseMappers } from 'objection';
import Attachment from './attachment';

export default class Weapon extends Model {
    name: string;
    unlockLevel: number;
    gameId: number;
    weaponCategoryId: number;
    weaponId: number;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'weapon';
    }

    static get idColumn() {
        return 'weapon_id';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ 'gameId', 'name', 'weaponCategoryId' ],
            properties: {
                gameId: { type: 'integer' },
                unlockLevel: { type: [ 'integer', 'null' ] },
                name: { type: 'string', minLength: 1, maxLength: 100 },
                weaponCategoryId: { type: 'integer' },
            }
        };
    }

    static relationMappings = {
        attachments: {
            relation: Model.ManyToManyRelation,
            modelClass: Attachment,
            join: {
                from: 'weapon.weapon_id',
                through: {
                    from: 'weapon_attachment.weapon_id',
                    to: 'weapon_attachment.attachment_id'
                },
                to: 'attachment.attachment_id'
            }
        },
    };
}