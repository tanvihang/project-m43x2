// Export all storage utilities
export { storage } from './mmkvInstance';
export { STORAGE_KEYS } from './storageKeys';
export { StorageService } from './storageService';

// Export domain-specific storage services
export { AuthMmkvStorage } from './storage/authMmkvStorage';
export { SettingsMmkvStorage } from './storage/settingMmkvStorage';
