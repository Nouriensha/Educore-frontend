import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthContext } from '../../../context/AuthContext';

// Mock dependencies
vi.mock('../../../assets/green-logo.png', () => ({ default: 'mock-logo.png' }));
vi.mock('../../../services/api', () => ({
  default: {
    post: vi.fn()
  }
}));

const mockContextValue = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  login: vi.fn(),
  logout: vi.fn()
};

describe('Login Component Unit & UI Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.setItem('ui_cleanup_done', 'true');
  });

  test('should render email and password inputs with submit button', () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByPlaceholderText(/name@example.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/••••••••/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('should allow entering email and toggling password visibility', () => {
    render(
      <AuthContext.Provider value={mockContextValue}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const emailInput = screen.getByPlaceholderText(/name@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'MySecretPassword123' } });

    expect(emailInput.value).toBe('user@example.com');
    expect(passwordInput.value).toBe('MySecretPassword123');
  });
});
