import { describe, test, expect, beforeEach } from 'vitest';
import apiClient, { API_BASE_URL } from '../api';

describe('API Client Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should have defined API_BASE_URL', () => {
    expect(API_BASE_URL).toBeDefined();
  });

  test('should inject Authorization Bearer header when accessToken is present in localStorage', async () => {
    localStorage.setItem('accessToken', 'my_secret_jwt');
    const config = { headers: {} };

    // Invoke request interceptor directly
    const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
    const modifiedConfig = interceptor(config);

    expect(modifiedConfig.headers.Authorization).toBe('Bearer my_secret_jwt');
  });

  test('should not inject Authorization header if no accessToken exists', () => {
    const config = { headers: {} };
    const interceptor = apiClient.interceptors.request.handlers[0].fulfilled;
    const modifiedConfig = interceptor(config);

    expect(modifiedConfig.headers.Authorization).toBeUndefined();
  });
});
