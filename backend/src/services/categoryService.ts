import { NotFoundError } from 'objection';
import Category from '../models/category';

export default class CategoryService {
    public async getAll (): Promise<Category[]> {
        const categories = await Category.query();
        return categories;
    }

    public async getCategory ( categoryId: number ): Promise<Category> {
        const category = await Category.query().findOne( {
            weapon_category_id: categoryId
        } );

        if ( !category ) {
            throw new NotFoundError( { message: `Category not found for id: ${categoryId}` } );
        }

        return category;
    }
}