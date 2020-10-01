import { Model, snakeCaseMappers } from 'objection';

export default class APIKey extends Model {
    username: string;
    apiKey: string;
    expirationDate: Date;
    isAdmin: boolean;

    // TODO: validation

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'api_key';
    }

    static get idColumn() {
        return 'api_key_id';
    }
}