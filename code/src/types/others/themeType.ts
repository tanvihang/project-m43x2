export type ThemeType = {
    backgroundColor: string,

    //* Text Colors *//
    textBody: string,
    textWhite: string;
    textBlack: string;
    textAccent: string,
    textDanger: string,
    textHelp: string,
    textDisabled: string,


    // * Surface Colors *//
    surfaceButton: string,
    surfaceButtonDisabled: string,
    surfaceCard: string,
    surfaceCardPressed: string,
    surfaceTextInput: string,
    surfaceDanger: string,

    // * Border Colors *//
    borderAccent: string,
    borderBody: string,
    borderDivider: string,
    borderDanger: string,

    //* Health-specific Colors
    recovery: string,
    recoveryLight: string,
    mildStress: string,
    mildStressLight: string,
    Stress: string,
    StressLight: string,

    Temperature: string,
    Infection: string,
    Menstruation: string,
    Fertile: string,
}