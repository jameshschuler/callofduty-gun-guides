import { Model, snakeCaseMappers } from 'objection';

export default class Category extends Model {
    weaponCategoryId: number;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'weapon_category';
    }
}