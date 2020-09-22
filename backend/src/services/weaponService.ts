import Attachment from '../models/attachment';
import Guide from '../models/guide';
import Weapon from '../models/weapon';
import WeaponAttachmentResponse from '../types/response/weaponAttachmentResponse';
import { WeaponGuideResponse } from '../types/response/weaponGuideResponse';

export default class WeaponService {
    async getWeaponAttachments( weaponId: number ): Promise<WeaponAttachmentResponse[]> {
        const weapon = await Weapon.query().findOne( {
            weapon_id: weaponId
        } );

        if ( !weapon ) {
            throw new Error( `Weapon not found for id: ${weaponId}` );
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

    async getWeaponGuides( weaponId: number ): Promise<WeaponGuideResponse[]> {
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