import { Model, snakeCaseMappers } from 'objection';

export default class Gear extends Model {
    gearId: number;
    name: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'gear';
    }
}