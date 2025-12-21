/**
 * MMKV Storage Keys
 * 
 * Naming Convention:
 * - Use namespaces to group related keys (e.g., 'auth:', 'user:', 'settings:')
 * - Use camelCase after the namespace
 * - Keep keys descriptive but concise
 */

export const STORAGE_KEYS = {
    // Authentication keys
    AUTH: {
        ACCESS_TOKEN: 'auth:accessToken',
        REFRESH_TOKEN: 'auth:refreshToken',
        USER_EMAIL: 'auth:userEmail',
    },

    // App settings keys
    SETTINGS: {
        THEME: 'settings:theme',
        LANGUAGE: 'settings:language',
        FONT_SIZE_SCALE: 'settings:fontSizeScale',
    },

} as const;

// Type helper for storage keys
export type StorageKey = string;
