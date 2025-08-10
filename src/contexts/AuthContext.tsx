// Simple auth context using React hooks
// Using functions instead of classes for simplicity

"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  getAccessToken, 
  getUserData, 
  hasTokens, 
  refreshAccessToken, 
  clearTokens, 
  logoutUser 
} from '@/utils/tokenManager';
import { UserData } from '@/utils/tokenManager';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserData | null;
  login: (tokens: { accessToken: string; refreshToken: string; user: UserData }) => void;
  logout: (callBackend?: boolean) => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);

  // Check authentication status
  const checkAuth = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Check if tokens exist
      if (!hasTokens()) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      const token = getAccessToken();
      const userData = getUserData();

      if (!token || !userData) {
        setIsAuthenticated(false);
        setUser(null);
        return false;
      }

      // Try to refresh token if needed
      try {
        // You could add token validation here
        setIsAuthenticated(true);
        setUser(userData);
        return true;
      } catch {
        // Try refresh token
        const newToken = await refreshAccessToken();
        
        if (newToken) {
          setIsAuthenticated(true);
          setUser(userData);
          return true;
        } else {
          clearTokens();
          setIsAuthenticated(false);
          setUser(null);
          return false;
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = (tokens: { accessToken: string; refreshToken: string; user: UserData }) => {
    // This would typically be called after successful login
    // The actual token setting should be done in the sign-in component
    setIsAuthenticated(true);
    setUser(tokens.user);
    setIsLoading(false);
  };

  // Logout function
  const logout = async (callBackend: boolean = true): Promise<void> => {
    setIsLoading(true);
    
    try {
      await logoutUser(callBackend);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// HOC for protected routes (alternative to AuthGuards)
export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthenticatedComponent: React.FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full mx-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <p className="text-gray-800 font-medium">Checking authentication</p>
                <p className="text-gray-500 text-sm">Please wait...</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to sign-in page
      if (typeof window !== 'undefined') {
        window.location.href = '/sign-in';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`;

  return AuthenticatedComponent;
};
