import { CameraBrandEnum, GearCategoryEnum } from "../../../types/enums";
import { LensType } from "../../../types/models/gear-wiki/gearType";

export const OLYMPUS_LENSES: LensType[] = [
    {
        Category: GearCategoryEnum.LENS,
        Id: 'oly-12-40mm-f2-8-pro',
        Brand: CameraBrandEnum.OLYMPUS,
        ModelName: 'M.Zuiko Digital ED 12-40mm f/2.8 PRO',
        DisplayName: 'Olympus M.Zuiko Digital ED 12-40mm f/2.8 PRO',
        ExifIdentifiers: ['OLYMPUS M.12-40mm F2.8 PRO'],
        VisualAssets: {
            Sketch: [],
            PrimaryColor: "#1E1E1E",
        },
        Lore: {
            Nickname: "The Workhorse Zoom",
            Description: "A versatile standard zoom lens known for its constant f/2.8 aperture, weather-sealed build, and exceptional optical performance.",
        }
    }
]