// Simple token management utility functions
// Using simple TypeScript functions instead of classes

import { encrypt, decrypt } from "./crypto";

export interface UserData {
  _id?: string;
  id?: string;
  userID?: string;
  account?: {
    email: string;
    firstName: string;
    lastName: string;
  };
  security?: {
    role: string;
  };
  [key: string]: unknown; // Allow additional properties
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
  user: UserData;
}

// Token key constants
const ACCESS_TOKEN_KEY = "vv_access_token";
const REFRESH_TOKEN_KEY = "vv_refresh_token";
const USER_DATA_KEY = "vv_user";

/**
 * Store tokens and user data
 * @param tokens - Token data containing access token, refresh token, and user info
 * @param rememberMe - Whether to store in localStorage or sessionStorage
 */
export const setTokens = (
  tokens: TokenData,
  rememberMe: boolean = false
): void => {
  const storage = rememberMe ? localStorage : sessionStorage;

  try {
    storage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    storage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    storage.setItem(USER_DATA_KEY, JSON.stringify(tokens.user));
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};

/**
 * Get access token from storage
 * @returns Access token or null if not found
 */
export const getAccessToken = (): string | null => {
  try {
    return (
      localStorage.getItem(ACCESS_TOKEN_KEY) ||
      sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  } catch (error) {
    console.error("Error getting access token:", error);
    return null;
  }
};

/**
 * Get refresh token from storage
 * @returns Refresh token or null if not found
 */
export const getRefreshToken = (): string | null => {
  try {
    return (
      localStorage.getItem(REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
  } catch (error) {
    console.error("Error getting refresh token:", error);
    return null;
  }
};

/**
 * Get user data from storage
 * @returns User data object or null if not found
 */
export const getUserData = (): UserData | null => {
  try {
    const userData =
      localStorage.getItem(USER_DATA_KEY) ||
      sessionStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

/**
 * Clear all tokens and user data
 */
export const clearTokens = (): void => {
  try {
    // Clear from both localStorage and sessionStorage
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error("Error clearing tokens:", error);
  }
};

/**
 * Check if user has valid tokens
 * @returns Boolean indicating if tokens exist
 */
export const hasTokens = (): boolean => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  return !!(accessToken && refreshToken);
};

/**
 * Update only the access token (for refresh scenarios)
 * @param newAccessToken - New access token to store
 */
export const updateAccessToken = (newAccessToken: string): void => {
  try {
    // Determine which storage was used originally
    const storage = localStorage.getItem(ACCESS_TOKEN_KEY)
      ? localStorage
      : sessionStorage;
    storage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
  } catch (error) {
    console.error("Error updating access token:", error);
  }
};

/**
 * Refresh access token using refresh token
 * @returns New access token or null if refresh failed
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.error("No refresh token available");
    return null;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: encrypt(JSON.stringify({ refreshToken })), // Following your encryption pattern
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      // Assuming the response follows your encryption pattern
      if (data.success && data.data) {
        const decryptedData = JSON.parse(decrypt(data.data));
        const newAccessToken = decryptedData.accessToken;
        updateAccessToken(newAccessToken);
        return newAccessToken;
      }
    }

    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

/**
 * Check if access token is expired (basic check without verification)
 * @returns Boolean indicating if token appears expired
 */
export const isTokenExpired = (): boolean => {
  const token = getAccessToken();

  if (!token) return true;

  try {
    // Decode JWT payload (without verification)
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    return payload.exp < currentTime;
  } catch (error) {
    console.error("Error checking token expiry:", error);
    return true; // Assume expired if we can't parse
  }
};

/**
 * Get user role from stored user data
 * @returns User role or 'user' as default
 */
export const getUserRole = (): string => {
  const userData = getUserData();
  return userData?.security?.role || "user";
};

/**
 * Get user ID from stored user data
 * @returns User ID or null
 */
export const getUserId = (): string | null => {
  const userData = getUserData();
  return userData?._id || userData?.id || null;
};

import { logoutUserAPI } from "../services/auth.service";

/**
 * Logout user by clearing tokens and optionally calling backend
 * @param callBackend - Whether to inform backend about logout
 */
export const logoutUser = async (
  callBackend: boolean = true
): Promise<void> => {
  const refreshToken = getRefreshToken();
  const accessToken = getAccessToken();

  // Clear tokens from storage first
  clearTokens();

  // Optionally inform backend about logout
  if (callBackend && accessToken) {
    try {
      await logoutUserAPI(accessToken, refreshToken || undefined);
    } catch (error) {
      console.error("Failed to inform backend about logout:", error);
      // Don't throw error here as tokens are already cleared locally
    }
  }
};

/**
 * Simple token validation check (client-side only)
 * @returns Boolean indicating basic token validity
 */
export const isValidToken = (): boolean => {
  const token = getAccessToken();

  if (!token) return false;

  try {
    // Basic JWT structure check
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Try to decode payload
    const payload = JSON.parse(atob(parts[1]));

    // Check if token has required fields
    return !!(payload.userId && payload.exp);
  } catch {
    return false;
  }
};
