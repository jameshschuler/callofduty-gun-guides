import { Model, snakeCaseMappers } from 'objection';

export default class Weapon extends Model {
    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'weapon';
    }
}