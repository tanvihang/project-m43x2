export type FontSizes = {
  // Headings
  h1: number;
  h2: number;
  h3: number;
  h4: number;
  h5: number;
  h6: number;

  // Body text
  body: number;
  bodySmall: number;

  // UI elements
  button: number;
  caption: number;
  label: number;
  input: number;
};

export const fontSizes = {
  small: {
    // Headings
    h1: 24,
    h2: 20,
    h3: 18,
    h4: 16,
    h5: 14,
    h6: 12,
    
    // Body text
    body: 13,
    bodySmall: 11,
    
    // UI elements
    button: 14,
    caption: 10,
    label: 12,
    input: 13,
  },
  medium: {
    // Headings
    h1: 28,
    h2: 24,
    h3: 20,
    h4: 18,
    h5: 16,
    h6: 14,
    
    // Body text
    body: 15,
    bodySmall: 13,
    
    // UI elements
    button: 16,
    caption: 12,
    label: 14,
    input: 15,
  },
  large: {
    // Headings
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    
    // Body text
    body: 17,
    bodySmall: 15,
    
    // UI elements
    button: 18,
    caption: 14,
    label: 16,
    input: 17,
  },
  xlarge: {
    // Headings
    h1: 36,
    h2: 32,
    h3: 28,
    h4: 24,
    h5: 20,
    h6: 18,
    
    // Body text
    body: 19,
    bodySmall: 17,
    
    // UI elements
    button: 20,
    caption: 16,
    label: 18,
    input: 19,
  },
};

export const fontWeights = {
  thin: '100' as const,
  extraLight: '200' as const,
  light: '300' as const,
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
  extraBold: '800' as const,
  black: '900' as const,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
};

export default fontSizes;
