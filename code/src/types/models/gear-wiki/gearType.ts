import { AutofocusTypeEnum, CameraBrandEnum, GearCategoryEnum, OlympusCameraSeriesEnum, SensorTypeEnum, UsbTypeEnum, VideoBitDepthEnum, WeatherProofRatingEnum } from "../../enums";

type BaseGearType = {
    Id: string;
    Brand: CameraBrandEnum;
    Category: GearCategoryEnum;
    ModelName: string;
    DisplayName: string;
    VisualAssets: {
        Sketch: string[]; // 引用图片资源
        PrimaryColor: string;
    },
    ExifIdentifiers: string[];
    Lore: {
        Nickname: string;
        Description: string;
    }
}

export type CameraType = BaseGearType & {
    Category: GearCategoryEnum.CAMERA;
    // Additional camera-specific properties can be added here
    Series: OlympusCameraSeriesEnum;
    CoreSpecs: {
        Sensor: {
            CropFactor: number;
            Megapixels: number;
            Type: SensorTypeEnum;
        };
        StabilizationStops: number;
    };
    ComputationalFeatures: {
        LiveNd: boolean;
        LiveComposite: boolean;
    };
    AdvancedSpecs?: {
        Video: {
            MaxResolution: string; // "4K/60p"
            BitDepth: VideoBitDepthEnum;
            LogProfiles: string[]; // ["OM-Log400", "HLG"]
        };
        Autofocus: {
            Type: AutofocusTypeEnum;
            Points: number;
            SubjectDetection: string[]; // ["Birds", "Cars", "Humans", "Cats"]
        };
        Build: {
            Material: string; // "Magnesium Alloy"
            ShutterLife: number; // 200,000
            WeatherProofRating: WeatherProofRatingEnum;
        };
        Connectivity: {
            UsbType: UsbTypeEnum;
            ChargingSupported: boolean;
        };
    };
}

export type LensType = BaseGearType & {
    Category: GearCategoryEnum.LENS;
    // Additional lens-specific properties can be added here
}