import { 
    BaseProfileEnum, 
    GradationEnum, 
    MonoFilterEffectEnum, 
    GrainEffectEnum,
    OlympusCameraSeriesEnum 
} from "../../types/enums";
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
                Hue: 18,
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
    },

    // --- 经典粗颗粒黑白 (致敬荒木经惟风格) ---
    {
        Id: 'recipe-gritty-mono',
        Title: "Gritty Monochrome",
        Author: "m43x2_Dev",
        CompatibleSeries: [OlympusCameraSeriesEnum.PEN, OlympusCameraSeriesEnum.OM_D],
        Settings: {
            BaseProfile: BaseProfileEnum.MONOCHROME,
            Saturation: 0,
            Contrast: 3,
            Sharpness: 1,
            Gradation: GradationEnum.LOW_KEY,
            Curve: {
                Highlight: 2,
                Shadow: -3,
            },
            MonoProfile: {
                FilterEffect: MonoFilterEffectEnum.RED, // 红色滤镜增加天空反差
                GrainEffect: GrainEffectEnum.HIGH,    // 高颗粒感
                ShadingEffect: -2,                    // 轻微暗角
            }
        },
        Visuals: {
            PreviewImage: [],
            ThemeColor: "#333333",
        },
        Lore: {
            Description: "极高反差与粗糙颗粒，模拟高感光度黑白胶卷的质感，适合充满情绪的街拍。",
            BestScenarios: ["Street", "Night", "Portrait"],
        }
    },

    // --- 温暖怀旧胶片 (Vintage Warm) ---
    {
        Id: 'recipe-vintage-summer',
        Title: "Vintage Summer",
        Author: "m43x2_Dev",
        CompatibleSeries: [OlympusCameraSeriesEnum.PEN, OlympusCameraSeriesEnum.OM_D, OlympusCameraSeriesEnum.OM_SYSTEM],
        Settings: {
            BaseProfile: BaseProfileEnum.MUTED,
            Saturation: -1,
            Contrast: -2,
            Sharpness: -1,
            Gradation: GradationEnum.HIGH_KEY,
            Curve: {
                Highlight: -3,
                Shadow: 3, // 拉起阴影，形成虚化的胶片感
            },
            ColorCreator: {
                Hue: 5,   // 偏橙黄色调
                Vividness: 2
            }
        },
        Visuals: {
            PreviewImage: [],
            ThemeColor: "#D4A373",
        },
        Lore: {
            Description: "低反差、高亮度的暖调配方。仿佛褪色的旧相片，适合记录夏日下午的阳光。",
            BestScenarios: ["Afternoon", "Cafe", "Daily Life"],
        }
    },

    // --- 森系清新 (Forest Ethereal) ---
    {
        Id: 'recipe-forest-whisper',
        Title: "Forest Whisper",
        Author: "m43x2_Dev",
        CompatibleSeries: [OlympusCameraSeriesEnum.OM_D, OlympusCameraSeriesEnum.OM_SYSTEM],
        Settings: {
            BaseProfile: BaseProfileEnum.NATURAL,
            Saturation: 1,
            Contrast: 0,
            Sharpness: 2,
            Gradation: GradationEnum.NORMAL,
            Curve: {
                Highlight: 1,
                Shadow: -1,
            },
            ColorCreator: {
                Hue: 12, // 强化绿色与黄绿色的过渡
                Vividness: 2
            }
        },
        Visuals: {
            PreviewImage: [],
            ThemeColor: "#4F772D",
        },
        Lore: {
            Description: "优化绿色表现，提升画面锐度，适合拍摄森林、植物或带有青苔的古老建筑。",
            BestScenarios: ["Forest", "Park", "Nature"],
        }
    }
];