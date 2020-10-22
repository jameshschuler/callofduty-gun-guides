import { StatusCodes } from 'http-status-codes';
import { CreateWeaponRequest } from 'src/types/request/createWeaponRequest';
import Attachment from '../models/attachment';
import Category from '../models/category';
import Game from '../models/game';
import Guide from '../models/guide';
import Weapon from '../models/weapon';
import { AppError } from '../types/errors';
import WeaponAttachmentResponse from '../types/response/weaponAttachmentResponse';
import { WeaponGuideResponse } from '../types/response/weaponGuideResponse';
import { WeaponResponse } from '../types/response/weaponResponse';

export default class WeaponService {
    public async createWeapon( request: CreateWeaponRequest ): Promise<Weapon> {
        const { gameId, name, unlockLevel, weaponCategoryId } = request;
        const game = await Game.query().findOne( { game_id: gameId } );
        if ( !game ) {
            throw new AppError( `Game not found for id: ${gameId}`, StatusCodes.NOT_FOUND );
        }

        const category = await Category.query().findOne( { weapon_category_id: weaponCategoryId } );
        if ( !category ) {
            throw new AppError( `Category not found for id: ${weaponCategoryId}`, StatusCodes.NOT_FOUND );
        }

        const existingWeapon = await Weapon.query()
            .where( 'game_id', '=', game.gameId )
            .where( 'name', '=', request.name ).first();

        if ( existingWeapon ) {
            throw new AppError( `Weapon '${request.name}' already exists for ${game.name}`, StatusCodes.CONFLICT )
        }

        const newWeapon = await Weapon.query().insert( {
            gameId,
            weaponCategoryId,
            name,
            unlockLevel
        } );

        return newWeapon;
    }

    public async getWeaponByCategory( gameId: number, categoryId: number, weaponId: number ): Promise<WeaponResponse> {
        const game = await Game.query().findOne( { game_id: gameId } );
        if ( !game ) {
            throw new AppError( `Game not found for id: ${gameId}`, StatusCodes.NOT_FOUND );
        }

        const category = await Category.query().findOne( { weapon_category_id: categoryId } );
        if ( !category ) {
            throw new AppError( `Category not found for id: ${categoryId}`, StatusCodes.NOT_FOUND );
        }

        const weapon = await Weapon.query()
            .where( 'game_id', '=', game.gameId )
            .where( 'weapon_category_id', '=', category.weaponCategoryId )
            .where( 'weapon_id', '=', weaponId ).first();
        if ( !weapon ) {
            throw new AppError( `Weapon not found for id: ${weaponId}`, StatusCodes.NOT_FOUND );
        }

        return {
            name: weapon.name,
            unlockLevel: weapon.unlockLevel
        };
    }

    public async getWeaponsByCategory( gameId: number, categoryId: number ): Promise<WeaponResponse[]> {
        const game = await Game.query().findOne( { game_id: gameId } );
        if ( !game ) {
            throw new AppError( `Game not found for id: ${gameId}`, StatusCodes.NOT_FOUND );
        }

        const category = await Category.query().findOne( { weapon_category_id: categoryId } );
        if ( !category ) {
            throw new AppError( `Category not found for id: ${categoryId}`, StatusCodes.NOT_FOUND );
        }

        const weapons = await Weapon.query()
            .where( 'game_id', '=', game.gameId )
            .where( 'weapon_category_id', '=', category.weaponCategoryId );

        return weapons.map( e => { return { name: e.name, unlockLevel: e.unlockLevel } } ) as WeaponResponse[];
    }

    public async getWeaponAttachments( weaponId: number ): Promise<WeaponAttachmentResponse[]> {
        const weapon = await Weapon.query().findOne( {
            weapon_id: weaponId
        } );

        if ( !weapon ) {
            throw new AppError( `Weapon not found for id: ${weaponId}`, StatusCodes.NOT_FOUND );
        }

        const attachments = await weapon.$relatedQuery( 'attachments' ) as Attachment[];

        const response = attachments.map( ( attachment: Attachment ) => {
            return {
                attachmentId: attachment.attachmentId,
                name: attachment.name,
                isOptic: attachment.isOptic
            } as WeaponAttachmentResponse
        } );

        return response;
    }

    public async getWeaponGuides( weaponId: number ): Promise<WeaponGuideResponse[]> {
        const guides = await Guide.query().where( 'primary_weapon_id', '=', weaponId );

        if ( guides && guides.length > 0 ) {
            return guides.map( ( guide: Guide ) => {
                return {
                    guideId: guide.guideId,
                    name: guide.name,
                    createdBy: guide.createdBy,
                    videoUrl: guide.videoUrl,
                    sourceUrl: guide.sourceUrl,
                } as WeaponGuideResponse
            } );
        }

        return [];
    }
}