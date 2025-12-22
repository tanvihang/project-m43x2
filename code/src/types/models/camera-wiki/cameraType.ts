import { AutofocusTypeEnum, CameraBrandEnum, OlympusCameraSeriesEnum, SensorTypeEnum, UsbTypeEnum, VideoBitDepthEnum, WeatherProofRatingEnum } from "../../enums";

export type CameraType = {
    Id: string;
    Brand: CameraBrandEnum;
    Series: OlympusCameraSeriesEnum;
    ModelName: string;
    DisplayName: string
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
    VisualAssets: {
        Sketch: any; // 引用图片资源
        PrimaryColor: string;
    };
    ExifIdentifiers: string[];
    Lore: {
        Nickname: string;
        Description: string;
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