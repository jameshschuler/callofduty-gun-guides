export type GuideResponse = {
    guideId: number;
    name: string;
    createdBy: string;
    videoUrl: string;
    sourceUrl: string;
    gear: string;
    equipment: string;
    primaryWeapon: string;
    secondaryWeapon: string;
    primaryOptic: string;
    secondaryOptic: string;
    perks: string[];
    wildcards: string[];
    primaryWeaponAttachments: string[];
    secondaryWeaponAttachments: string[];
}