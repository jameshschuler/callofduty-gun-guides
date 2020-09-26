import { Model, snakeCaseMappers } from 'objection';
import Attachment from './attachment';
import Equipment from './equipment';
import Gear from './gear';
import Perk from './perk';
import Weapon from './weapon';
import Wildcard from './wildcard';

export default class Guide extends Model {
    guideId: number;
    name: string;
    createdBy: string;
    videoUrl: string;
    sourceUrl: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'guide';
    }

    static relationMappings = {
        equipment: {
            relation: Model.HasOneRelation,
            modelClass: Equipment,
            join: {
                from: 'guide.equipment_id',
                to: 'equipment.equipment_id'
            }
        },
        gear: {
            relation: Model.HasOneRelation,
            modelClass: Gear,
            join: {
                from: 'guide.gear_id',
                to: 'gear.gear_id'
            }
        },
        primaryWeapon: {
            relation: Model.HasOneRelation,
            modelClass: Weapon,
            join: {
                from: 'guide.primary_weapon_id',
                to: 'weapon.weapon_id'
            }
        },
        secondaryWeapon: {
            relation: Model.HasOneRelation,
            modelClass: Weapon,
            join: {
                from: 'guide.secondary_weapon_id',
                to: 'weapon.weapon_id'
            }
        },
        primaryOptic: {
            relation: Model.HasOneRelation,
            modelClass: Attachment,
            join: {
                from: 'guide.primary_optic_attachment_id',
                to: 'attachment.attachment_id'
            }
        },
        secondaryOptic: {
            relation: Model.HasOneRelation,
            modelClass: Attachment,
            join: {
                from: 'guide.secondary_optic_attachment_id',
                to: 'attachment.attachment_id'
            }
        },
        perks: {
            relation: Model.ManyToManyRelation,
            modelClass: Perk,
            join: {
                from: 'guide.guide_id',
                through: {
                    // persons_movies is the join table.
                    from: 'guide_perk.guide_id',
                    to: 'guide_perk.perk_id'
                },
                to: 'perk.perk_id'
            }
        },
        wildcards: {
            relation: Model.ManyToManyRelation,
            modelClass: Wildcard,
            join: {
                from: 'guide.guide_id',
                through: {
                    // persons_movies is the join table.
                    from: 'guide_wildcard.guide_id',
                    to: 'guide_wildcard.wildcard_id'
                },
                to: 'wildcard.wildcard_id'
            }
        }
    };
}