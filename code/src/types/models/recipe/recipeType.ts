import { BaseProfileEnum, GradationEnum, GrainEffectEnum, MonoFilterEffectEnum, OlympusCameraSeriesEnum } from "../../enums";

export type RecipeType = {
    Id: string;
    Title: string;
    Author: string;
    CompatibleSeries: OlympusCameraSeriesEnum[];
    
    Settings: {
        BaseProfile: BaseProfileEnum; // 使用 Enum
        Saturation: number; 
        Contrast: number;
        Sharpness: number;
        Gradation: GradationEnum; // 使用 Enum
        
        Curve: {
            Highlight: number;
            Shadow: number;
            Midtone?: number;
        };

        // 创意拨轮 (Color Creator)
        ColorCreator?: {
            Hue: number;
            Vividness: number;
        };

        // 黑白专属
        MonoProfile?: {
            FilterEffect: MonoFilterEffectEnum; // 使用 Enum
            GrainEffect: GrainEffectEnum;       // 使用 Enum
            ShadingEffect: number;
        };
    };

    Visuals: {
        PreviewImage: string[]; // 多张预览图
        ThemeColor: string;
    };

    Lore: {
        Description: string;
        BestScenarios: string[];
    };
}