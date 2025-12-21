import { StorageService } from '../storageService';
import { STORAGE_KEYS } from '../storageKeys';

// Domain-specific storage helpers
export const AuthMmkvStorage = {
  setAccessToken: (token: string) => 
    StorageService.setString(STORAGE_KEYS.AUTH.ACCESS_TOKEN, token),
  
  getAccessToken: () => 
    StorageService.getString(STORAGE_KEYS.AUTH.ACCESS_TOKEN),
  
  setRefreshToken: (token: string) => 
    StorageService.setString(STORAGE_KEYS.AUTH.REFRESH_TOKEN, token),
  
  getRefreshToken: () => 
    StorageService.getString(STORAGE_KEYS.AUTH.REFRESH_TOKEN),

  setUserEmail: (email: string) => 
    StorageService.setString(STORAGE_KEYS.AUTH.USER_EMAIL, email),
  
  getUserEmail: () => 
    StorageService.getString(STORAGE_KEYS.AUTH.USER_EMAIL),
  
  clearAuth: () => {
    StorageService.delete(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
    StorageService.delete(STORAGE_KEYS.AUTH.REFRESH_TOKEN);
    StorageService.delete(STORAGE_KEYS.AUTH.USER_EMAIL);
  },
};