import { Model, snakeCaseMappers } from 'objection';
import Attachment from './attachment';

export default class Weapon extends Model {
    name: string;
    unlockLevel: number;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'weapon';
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