import Attachment from 'src/models/attachment';
import WeaponAttachmentResponse from 'src/types/response/weaponAttachmentResponse';
import Weapon from '../models/weapon';

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
}