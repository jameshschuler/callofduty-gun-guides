import { Model, snakeCaseMappers } from 'objection';

export default class Attachment extends Model {
    attachmentId: number;
    name: string;
    isOptic: boolean;

    static get columnNameMappers() {
        return snakeCaseMappers();
    }

    static get tableName() {
        return 'attachment';
    }
}