import { Model, snakeCaseMappers } from 'objection';

export default class APIKey extends Model {
    username: string;
    apiKey: string;
    expirationDate: Date;
    isAdmin: boolean;

    static get jsonSchema () {
        return {
            type: 'object',
            required: [ 'api_key', 'username', 'is_admin' ],
            properties: {
                id: { type: 'integer' },
                api_key: { type: 'string' },
                useranme: { type: 'string', minLength: 1, maxLength: 100 },
                is_admin: { type: 'boolean' },
            }
        };
    }

    static get columnNameMappers () {
        return snakeCaseMappers();
    }

    static get tableName () {
        return 'api_key';
    }

    static get idColumn () {
        return 'api_key_id';
    }
}