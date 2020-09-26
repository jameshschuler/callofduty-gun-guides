import { Model, snakeCaseMappers } from 'objection';

export default class Wildcard extends Model {
    wildcardId: number;
    name: string;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'wildcard';
    }
}