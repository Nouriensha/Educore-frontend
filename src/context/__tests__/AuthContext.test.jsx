import { describe, test, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../AuthContext';
import { useAuth } from '../useAuth';
import { mockUser } from '../../tests/fixtures/mockData';

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

describe('AuthContext & useAuth Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should initialize with default unauthenticated state', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  test('should handle login and persist user and tokens to localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login({
        user: mockUser,
        accessToken: 'mock_access_token_123',
        refreshToken: 'mock_refresh_token_456'
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user.email).toBe('alex@example.com');
    expect(result.current.accessToken).toBe('mock_access_token_123');

    expect(localStorage.getItem('accessToken')).toBe('mock_access_token_123');
    expect(JSON.parse(localStorage.getItem('user')).email).toBe('alex@example.com');
  });

  test('should clear auth and localStorage on clearAuth()', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login({
        user: mockUser,
        accessToken: 'token_abc'
      });
    });

    act(() => {
      result.current.clearAuth();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
  });
});
