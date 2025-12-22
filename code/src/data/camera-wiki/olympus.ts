import { 
    CameraBrandEnum, 
    OlympusCameraSeriesEnum, 
    SensorTypeEnum, 
    VideoBitDepthEnum, 
    AutofocusTypeEnum, 
    WeatherProofRatingEnum, 
    UsbTypeEnum 
} from "../../types/enums";
import { CameraType } from "../../types/models";

export const OLYMPUS_CAMERAS: CameraType[] = [
    // --- PEN-F: The Legend ---
    {
        Id: 'oly-pen-f',
        Brand: CameraBrandEnum.OLYMPUS,
        Series: OlympusCameraSeriesEnum.PEN,
        ModelName: 'PEN-F',
        DisplayName: 'Olympus PEN-F',
        CoreSpecs: {
            Sensor: {
                CropFactor: 2.0,
                Megapixels: 20.3,
                Type: SensorTypeEnum.LIVE_MOS,
            },
            StabilizationStops: 5.0,
        },
        ComputationalFeatures: {
            LiveNd: false,
            LiveComposite: true,
        },
        VisualAssets: {
            Sketch: [],
            PrimaryColor: "#2D2D2D",
        },
        ExifIdentifiers: ["PEN-F"],
        Lore: {
            Nickname: "The Digital Masterpiece",
            Description: "A tribute to the 1963 half-frame classic. It features a unique Creative Dial for monochrome and color profile control.",
        },
        AdvancedSpecs: {
            Video: {
                MaxResolution: "1080/60p",
                BitDepth: VideoBitDepthEnum.BIT_8,
                LogProfiles: [],
            },
            Autofocus: {
                Type: AutofocusTypeEnum.CONTRAST,
                Points: 81,
                SubjectDetection: ["Face", "Eye"],
            },
            Build: {
                Material: "Magnesium Alloy",
                ShutterLife: 200000,
                WeatherProofRating: WeatherProofRatingEnum.NONE,
            },
            Connectivity: {
                UsbType: UsbTypeEnum.MICRO_USB,
                ChargingSupported: false,
            },
        },
    },

    // --- E-P7: The Modern Classic ---
    {
        Id: 'oly-e-p7',
        Brand: CameraBrandEnum.OLYMPUS,
        Series: OlympusCameraSeriesEnum.PEN,
        ModelName: 'E-P7',
        DisplayName: 'Olympus PEN E-P7',
        CoreSpecs: {
            Sensor: {
                CropFactor: 2.0,
                Megapixels: 20.3,
                Type: SensorTypeEnum.LIVE_MOS,
            },
            StabilizationStops: 4.5,
        },
        ComputationalFeatures: {
            LiveNd: false,
            LiveComposite: true,
        },
        VisualAssets: {
            Sketch: [],
            PrimaryColor: "#FFFFFF",
        },
        ExifIdentifiers: ["E-P7"],
        Lore: {
            Nickname: "The Pure PEN",
            Description: "Combining the styling of the PEN-F with a lightweight body, it’s the ultimate everyday carry for street photographers.",
        },
        AdvancedSpecs: {
            Video: {
                MaxResolution: "4K/30p",
                BitDepth: VideoBitDepthEnum.BIT_8,
                LogProfiles: [],
            },
            Autofocus: {
                Type: AutofocusTypeEnum.CONTRAST,
                Points: 121,
                SubjectDetection: ["Face", "Eye"],
            },
            Build: {
                Material: "Polycarbonate",
                ShutterLife: 100000,
                WeatherProofRating: WeatherProofRatingEnum.NONE,
            },
            Connectivity: {
                UsbType: UsbTypeEnum.MICRO_USB,
                ChargingSupported: true,
            },
        },
    },

    // --- E-PL10: The Popular Choice ---
    {
        Id: 'oly-e-pl10',
        Brand: CameraBrandEnum.OLYMPUS,
        Series: OlympusCameraSeriesEnum.PEN,
        ModelName: 'E-PL10',
        DisplayName: 'Olympus PEN E-PL10',
        CoreSpecs: {
            Sensor: {
                CropFactor: 2.0,
                Megapixels: 16.1,
                Type: SensorTypeEnum.LIVE_MOS,
            },
            StabilizationStops: 3.5,
        },
        ComputationalFeatures: {
            LiveNd: false,
            LiveComposite: true,
        },
        VisualAssets: {
            Sketch: [],
            PrimaryColor: "#C0C0C0",
        },
        ExifIdentifiers: ["E-PL10"],
        Lore: {
            Nickname: "The Blogger's Companion",
            Description: "Simple, stylish, and effective. The flip-down screen makes it the perfect tool for selfies and low-angle shots.",
        },
        AdvancedSpecs: {
            Video: {
                MaxResolution: "4K/30p",
                BitDepth: VideoBitDepthEnum.BIT_8,
                LogProfiles: [],
            },
            Autofocus: {
                Type: AutofocusTypeEnum.CONTRAST,
                Points: 121,
                SubjectDetection: ["Face", "Eye"],
            },
            Build: {
                Material: "Plastic & Metal",
                ShutterLife: 100000,
                WeatherProofRating: WeatherProofRatingEnum.NONE,
            },
            Connectivity: {
                UsbType: UsbTypeEnum.MICRO_USB,
                ChargingSupported: false,
            },
        },
    },
];