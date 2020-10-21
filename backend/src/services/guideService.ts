import { StatusCodes } from 'http-status-codes';
import Attachment from 'src/models/attachment';
import Wildcard from 'src/models/wildcard';
import Equipment from '../models/equipment';
import Gear from '../models/gear';
import Guide from '../models/guide';
import Perk from '../models/perk';
import Weapon from '../models/weapon';
import { AppError } from '../types/errors';
import { GuideResponse } from '../types/response/guideResponse';

export default class GuideService {
    async getGuide ( guideId: number ): Promise<GuideResponse> {
        const guide = await Guide.query().findOne( {
            guide_id: guideId
        } );

        if ( !guide ) {
            throw new AppError( `Guide not found for id: ${guideId}`, StatusCodes.NOT_FOUND );
        }

        const equipment = await guide.$relatedQuery<Equipment>( 'equipment' ).first();
        const gear = await guide.$relatedQuery<Gear>( 'gear' ).first();
        const primaryWeapon = await guide.$relatedQuery<Weapon>( 'primaryWeapon' ).first();
        const secondaryWeapon = await guide.$relatedQuery<Weapon>( 'secondaryWeapon' ).first();
        const perks = await guide.$relatedQuery<Perk>( 'perks' );
        const wildcards = await guide.$relatedQuery<Wildcard>( 'wildcards' );
        const primaryOptic = await guide.$relatedQuery<Attachment>( 'primaryOptic' ).first();
        const secondaryOptic = await guide.$relatedQuery<Attachment>( 'secondaryOptic' ).first();
        const primaryWeaponAttachments = await guide.$relatedQuery<Attachment>( 'primaryWeaponAttachments' );
        const secondaryWeaponAttachments = await guide.$relatedQuery<Attachment>( 'secondaryWeaponAttachments' );

        return {
            guideId: guide.guideId,
            name: guide.name,
            createdBy: guide.createdBy,
            videoUrl: guide.videoUrl,
            sourceUrl: guide.sourceUrl,
            equipment: equipment?.name,
            gear: gear.name,
            primaryWeapon: primaryWeapon?.name,
            secondaryWeapon: secondaryWeapon?.name,
            perks: perks?.map( e => e.name ),
            wildcards: wildcards?.map( e => e.name ),
            primaryOptic: primaryOptic?.name,
            secondaryOptic: secondaryOptic?.name,
            primaryWeaponAttachments: primaryWeaponAttachments.map( e => e.name ),
            secondaryWeaponAttachments: secondaryWeaponAttachments.map( e => e.name )
        } as GuideResponse;
    }
}