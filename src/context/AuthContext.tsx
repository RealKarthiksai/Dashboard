import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  mfaEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  pendingMfaUser: User | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; requiresMfa?: boolean; error?: string }>;
  verifyMfa: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USER: User = {
  id: 'usr_01H8X9',
  email: 'admin@trotos.com',
  name: 'Jane Doe',
  role: 'Owner',
  mfaEnabled: true,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingMfaUser, setPendingMfaUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local storage for persistent session simulation
    const savedToken = localStorage.getItem('trotos_auth_token');
    if (savedToken) {
      setUser(MOCK_USER);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 600));
    setIsLoading(false);

    if (email.toLowerCase() === 'admin@trotos.com' && pass === 'trotos2026') {
      if (MOCK_USER.mfaEnabled) {
        setPendingMfaUser(MOCK_USER);
        return { success: true, requiresMfa: true };
      }
      localStorage.setItem('trotos_auth_token', 'mock_jwt_token_123');
      setUser(MOCK_USER);
      return { success: true };
    }

    return { success: false, error: 'Invalid email address or password.' };
  };

  const verifyMfa = async (code: string) => {
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 500));
    setIsLoading(false);

    if (code === '123456' || code.length === 6) {
      localStorage.setItem('trotos_auth_token', 'mock_jwt_token_123');
      setUser(pendingMfaUser || MOCK_USER);
      setPendingMfaUser(null);
      return { success: true };
    }

    return { success: false, error: 'Invalid verification code. Try 123456.' };
  };

  const logout = () => {
    localStorage.removeItem('trotos_auth_token');
    setUser(null);
    setPendingMfaUser(null);
  };

  const requestPasswordReset = async (email: string) => {
    await new Promise((res) => setTimeout(res, 500));
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email}`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        pendingMfaUser,
        login,
        verifyMfa,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
