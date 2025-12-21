import axios, { isAxiosError, type InternalAxiosRequestConfig } from 'axios';
import { AuthMmkvStorage } from '../storage/mmkv';
import { refreshTokenApi } from './vitalz/token';
import { ErrorService, ErrorSource } from '../utils/error';

// Extend the AxiosRequestConfig to include retry count
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retryCount?: number;
}

// 默认 API 地址
const apiClient = axios.create({
  baseURL: '', // 可以留空
});

// 处理 Token 过期
const logOutUser = async () => {
    AuthMmkvStorage.clearAuth();
};

// 请求拦截器：自动携带 Authorization 头
apiClient.interceptors.request.use(async (config) => {
  try {
    const accessToken = AuthMmkvStorage.getAccessToken();
    if (accessToken && config?.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    // 如果 `url` 是完整路径，取消 `baseURL`
    if (config.url?.startsWith('http')) {
        config.baseURL = ''; // 覆盖 `baseURL`
    }
    if (__DEV__) {
      console.log("Using Wrapped API -", config.url);
    }
  } catch {
    throw new Error('Cannot get token from storage');
  }
  return config;
});

// 响应拦截器：处理 401 错误并尝试刷新 Token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log error through centralized error service and get normalized error
    const normalizedError = ErrorService.handleRestError(
      error,
      error.config?.url,
      error.config?.method,
      { logToConsole: true, logToRemote: true }
    );

    if (isAxiosError(error) && error.response?.status === 401) {
      const originalRequest = error.config as ExtendedAxiosRequestConfig;

      if (!originalRequest) throw normalizedError;

      // 失败 2 次后登出
      if (originalRequest._retryCount) {
        originalRequest._retryCount++;
      } else {
        originalRequest._retryCount = 1;
      }

      if (originalRequest._retryCount > 2) {
        await logOutUser();
        throw normalizedError;
      }

      try {
        const accessToken = AuthMmkvStorage.getAccessToken();

        if(!accessToken){
            throw normalizedError;
        }
        
        const newToken = await refreshTokenApi(accessToken);
        if (!newToken) {
          throw normalizedError;
        }

        // 更新请求头，重试原请求
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest);
      } catch (error_) {
        await logOutUser();
        // If refresh failed, throw the refresh error normalized
        const refreshNormalizedError = ErrorService.handleError(
          error_,
          {
            source: ErrorSource.REST,
            endpoint: originalRequest.url,
            method: originalRequest.method,
          },
          { logToConsole: true, logToRemote: true }
        );
        throw refreshNormalizedError;
      }
    }

    // Throw normalized error instead of original
    throw normalizedError;
  }
);

export default apiClient;
