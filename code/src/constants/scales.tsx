import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");


type TSpacing = {
    none: number,
    xs: number,
    sm: number,
    md: number,
    lg: number,
    xl: number,
    xxl: number,
}

type TRadius = {
    minimal: number,
    rounded: number,
    roundedModal: number,
    full: number,
}

type TFontType = {
    regular: string,
    bold: string
}

type TIconSize = {
    iconSmall: number,
    iconMedium: number,
    iconLarge: number
}

export type TScaleValue = {
    spacing: TSpacing,
    radius: TRadius,
    fontType: TFontType
    widths: TWidth,
    heights: THeight,
    borders: TBorder,
    iconSize: TIconSize

}


const iconSize: TIconSize = {
    iconSmall: 16,
    iconMedium: 24,
    iconLarge: 32
}

export const spacingScale = {
    half: 4,
    one: 8,
    two: 16,
    three: 24,
    four: 32,
    five: 40,
    six: 48,
    seven: 56,
    eight: 64,
    nine: 72,
    ten: 80,
    eleven: 88,
    twelve: 96,
    thirteen: 104,
};

export const radiusScale = {
    sm: 4,
    md: 8,
    lg: 13,
    xl: 32,
    xxl: 128,
    xxxl: 360,
};


type TWidth = {
    eights: number;
    sixteens: number;
    quarter: number;
    half: number;
    full: number;
}

const widths:TWidth = {
    eights: width/8,
    sixteens: width/16,
    quarter: width/4,
    half: width/2,
    full: width
}

type THeight = {
    sixteens: number;
    eights: number;
    quarter: number;
    thrids: number
    half: number;
    full: number;
}

type TBorder = {
    small: number;
    medium: number;    
    large: number;    
}

const heights:THeight = {
    eights: height/8,
    sixteens: height/16,
    quarter: height/4,
    thrids: height/3,
    half: height/2,
    full: height
}

const border:TBorder = {
    small: 0.7,
    medium: 1.5,
    large: 2,
}

export const scaleValues:TScaleValue = {
    iconSize: iconSize,
    spacing: {
        none: 0,
        xs: spacingScale.half,
        sm: spacingScale.one,
        md: spacingScale.two,
        lg: spacingScale.four,
        xl: spacingScale.six,
        xxl: spacingScale.thirteen,
    },
    radius: {
        minimal: radiusScale.sm,
        rounded: radiusScale.md,
        roundedModal: radiusScale.xl,
        full: radiusScale.xxxl,
    },
    fontType: {
        regular: 'Montserrat-Regular',
        bold: 'Montserrat-Bold',
    },
    widths: widths,
    heights: heights,
    borders: border
};

