import { Model, snakeCaseMappers } from 'objection';
import Equipment from './equipment';
import Gear from './gear';
import Weapon from './weapon';

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
        }
    };
}