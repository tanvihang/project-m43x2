import { BaseProfileEnum, GradationEnum, OlympusCameraSeriesEnum } from "../../types/enums";
import { RecipeType } from "../../types/models/recipe/recipeType";

export const OLYMPUS_RECIPES: RecipeType[] = [
    {
        Id: 'recipe-deep-ocean',
        Title: "Deep Ocean Blue",
        Author: "m43x2_Dev",
        CompatibleSeries: [OlympusCameraSeriesEnum.PEN, OlympusCameraSeriesEnum.OM_D],
        Settings: {
            BaseProfile: BaseProfileEnum.VIVID,
            Saturation: 2,
            Contrast: 1,
            Sharpness: 0,
            Gradation: GradationEnum.NORMAL,
            Curve: {
                Highlight: -2,
                Shadow: 2,
            },
            ColorCreator: {
                Hue: 18, // 偏向青蓝色
                Vividness: 3
            }
        },
        Visuals: {
            PreviewImage: [],
            ThemeColor: "#005B96",
        },
        Lore: {
            Description: "强调奥林巴斯标志性的蓝色，适合在海边或晴朗的蓝天下使用。",
            BestScenarios: ["Seaside", "Clear Sky"],
        }
    }
];