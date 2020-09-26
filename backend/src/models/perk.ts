import { Model, snakeCaseMappers } from 'objection';

export default class Perk extends Model {
    perkId: number;
    name: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'perk';
    }
}