import Category from '../models/category';

export default class CategoryService {
    async getCategory( categoryId: number ): Promise<Category> {
        const category = await Category.query().findOne( {
            weapon_category_id: categoryId
        } );

        if ( !category ) {
            throw new Error( `Category not found for id: ${categoryId}` );
        }

        return category;
    }
}