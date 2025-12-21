type ColorPalette = {
    // Base colors
    background: string,
    plainWhite: string,
    plainBlack: string,

    // Primary (Brand color)
    primary900: string,
    primary800: string,
    primary700: string,
    primary600: string,
    primary500: string,
    primary400: string,
    primary300: string,
    primary200: string,
    primary100: string,

    // Grey (Neutral)
    grey900: string,
    grey800: string,
    grey700: string,
    grey600: string,
    grey500: string,
    grey400: string,
    grey300: string,
    grey200: string,
    grey100: string,

    // Accent (Secondary brand color)
    accent900: string,
    accent800: string,
    accent700: string,
    accent600: string,
    accent500: string,
    accent400: string,
    accent300: string,
    accent200: string,
    accent100: string,

    // Success (Green - confirmations, positive actions)
    success900: string,
    success800: string,
    success700: string,
    success600: string,
    success500: string,
    success400: string,
    success300: string,
    success200: string,
    success100: string,

    // Danger/Error (Red - errors, destructive actions)
    danger900: string,
    danger800: string,
    danger700: string,
    danger600: string,
    danger500: string,
    danger400: string,
    danger300: string,
    danger200: string,
    danger100: string,

    // Warning (Orange/Yellow - warnings, alerts)
    warning900: string,
    warning800: string,
    warning700: string,
    warning600: string,
    warning500: string,
    warning400: string,
    warning300: string,
    warning200: string,
    warning100: string,

    // Info (Blue - informational messages)
    info900: string,
    info800: string,
    info700: string,
    info600: string,
    info500: string,
    info400: string,
    info300: string,
    info200: string,
    info100: string,

    // App Specific Colors
    recovery: string,
    recoveryLight: string,
    mildStress: string,
    mildStressLight: string,
    Stress: string,
    StressLight: string,

    Temperature: string,
    Infection: string,
    Menstruation: string,
    Fertile: string
}

const Colors: ColorPalette = {
    // Base colors
    background: '#FAF9FA',
    plainWhite: '#FFFFFF',
    plainBlack: '#000000',

    // Primary (Purple/Blue - from your palette)
    primary900: '#1E1548', // Darkest purple
    primary800: '#1A3E9E', // Deep blue
    primary700: '#7D7BAA', // Medium purple
    primary600: '#A9A5C9', // Light purple
    primary500: '#C4C0DC', // Very light purple
    primary400: '#D4D1E8',
    primary300: '#E0DEF0',
    primary200: '#ECEAF7',
    primary100: '#F6F5FB',

    // Grey (Neutral)
    grey900: '#1A1A1A',
    grey800: '#333333',
    grey700: '#4D4D4D',
    grey600: '#666666',
    grey500: '#808080',
    grey400: '#999999',
    grey300: '#B3B3B3',
    grey200: '#CCCCCC',
    grey100: '#E6E6E6',

    // Accent (Mauve/Rose - from your palette)
    accent900: '#2E273F', // Dark navy/purple
    accent800: '#8B6F7D', // Mauve
    accent700: '#77626F', // Darker mauve
    accent600: '#A08892',
    accent500: '#B5A0A8',
    accent400: '#C9B8BE',
    accent300: '#DDD0D4',
    accent200: '#F1E8EA',
    accent100: '#F8F4F5',

    // Success (Green - confirmations, positive actions)
    success900: '#1B4D1B',
    success800: '#2D6A2D',
    success700: '#3F873F',
    success600: '#52A452',
    success500: '#66BB66',
    success400: '#85C885',
    success300: '#A3D6A3',
    success200: '#C2E3C2',
    success100: '#E0F1E0',

    // Danger/Error (Red - errors, destructive actions)
    danger900: '#5A1515',
    danger800: '#7D1F1F',
    danger700: '#A02828',
    danger600: '#C33232',
    danger500: '#E63C3C',
    danger400: '#EB6363',
    danger300: '#F08A8A',
    danger200: '#F5B1B1',
    danger100: '#FAD8D8',

    // Warning (Orange/Yellow - warnings, alerts)
    warning900: '#663D00',
    warning800: '#8F5600',
    warning700: '#B86F00',
    warning600: '#E18800',
    warning500: '#FFA500',
    warning400: '#FFB733',
    warning300: '#FFC966',
    warning200: '#FFDB99',
    warning100: '#FFEDCC',

    // Info (Blue - informational messages)
    info900: '#003D66',
    info800: '#00568F',
    info700: '#006FB8',
    info600: '#0088E1',
    info500: '#00A1FF',
    info400: '#33B4FF',
    info300: '#66C7FF',
    info200: '#99DAFF',
    info100: '#CCEDFF',

    // Health-specific Colors
    recovery: '#92C270',
    recoveryLight: '#C6D8B9',
    mildStress: '#FF7D0B',
    mildStressLight: '#FED4A4',
    Stress: '#EA575E',
    StressLight: '#F6B0B2',

    Temperature: '#00BFFF',
    Infection: '#FFFACD', // Cream/Light yellow color from palette
    Menstruation: '#F4AFB7',
    Fertile: '#E5CEFD',
}

export default Colors;