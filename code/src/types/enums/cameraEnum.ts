export enum CameraBrandEnum {
    OLYMPUS = "Olympus",
    PANASONIC = "Panasonic",
    OM_SYSTEM = "OM SYSTEM",
    LUMIX = "Lumix",
}

export enum OlympusCameraSeriesEnum {
    PEN = "PEN",
    OM_D = "OM-D",
    OM_SYSTEM = "OM SYSTEM", // For the new brand era (OM-1, OM-5)
    TOUGH = "Tough",
    E_SYSTEM = "E-System",   // For the old DSLR 4/3 cameras
}

export enum VideoBitDepthEnum {
    BIT_8 = "8-bit",
    BIT_10 = "10-bit",
    BIT_12 = "12-bit",
}

export enum AutofocusTypeEnum {
    CONTRAST = "Contrast Detection",
    PHASE = "Phase Detection",
    HYBRID = "Hybrid",
}

export enum WeatherProofRatingEnum {
    NONE = "None",
    IPX1 = "IPX1",
    IP53 = "IP53",
    IPX8 = "IPX8", // Common for Tough series
}

export enum UsbTypeEnum {
    USB_C = "USB-C",
    MICRO_USB = "Micro-USB",
    MINI_USB = "Mini-USB",
}

export enum SensorTypeEnum {
    LIVE_MOS = "Live MOS",
    STACKED_LIVE_MOS = "Stacked BSI Live MOS",
    CCD = "CCD", // For those "old soul" Olympus colors
}