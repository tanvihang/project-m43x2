// 基础色彩配置
export enum BaseProfileEnum {
    NATURAL = "Natural",
    PORTRAIT = "Portrait",
    MUTED = "Muted",
    MONOCHROME = "Monochrome",
    VIVID = "Vivid",
    FLAT = "Flat", // 部分新机型支持
}

// 影调等级
export enum GradationEnum {
    AUTO = "Auto",
    NORMAL = "Normal",
    HIGH_KEY = "High Key",
    LOW_KEY = "Low Key",
}

// 黑白滤镜效果 (黄色/橙色/红色/绿色)
export enum MonoFilterEffectEnum {
    NONE = "None",
    YELLOW = "Yellow",
    ORANGE = "Orange",
    RED = "Red",
    GREEN = "Green",
}

// 颗粒感强度
export enum GrainEffectEnum {
    NONE = "None",
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High",
}