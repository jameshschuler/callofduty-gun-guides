import Guide from '../models/guide';
import { GuideResponse } from '../types/response/guideResponse';

export default class GuideService {
    async getGuide( guideId: number ): Promise<GuideResponse> {
        const guide = await Guide.query().findOne( {
            guide_id: guideId
        } );

        if ( !guide ) {
            throw new Error( `Guide not found for id: ${guideId}` );
        }

        const equipment = await guide.$relatedQuery( 'equipment' );
        const gear = await guide.$relatedQuery( 'gear' );
        const primaryWeapon = await guide.$relatedQuery( 'primaryWeapon' );

        return {
            guideId: guide.guideId,
            name: guide.name,
            createdBy: guide.createdBy,
            videoUrl: guide.videoUrl,
            sourceUrl: guide.sourceUrl,
            equipment: ( equipment as any ).name,
            gear: ( gear as any ).name,
            primaryWeapon: ( primaryWeapon as any ).name
        } as GuideResponse;
    }
}