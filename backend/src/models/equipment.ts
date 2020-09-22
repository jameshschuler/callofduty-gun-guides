import { Model, snakeCaseMappers } from 'objection';

export default class Equipment extends Model {
    equipmentId: number;
    name: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'equipment';
    }
}