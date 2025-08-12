// Global API error handler for authentication issues
import { toast } from "react-hot-toast";
import { clearTokens } from "./tokenManager";

export interface APIError {
  success: boolean;
  message: string;
  error?: string | unknown;
}

/**
 * Handle authentication-related API errors
 * @param response - The fetch response
 * @param responseData - The parsed response data
 * @returns boolean - true if error was handled, false otherwise
 */
export const handleAuthenticationError = (
  response: Response,
  responseData: APIError
): boolean => {
  // Check for authentication errors (401, 403)
  if (response.status === 401 || response.status === 403) {
    const message = responseData.message || "";
    
    // Check for specific account status messages
    if (message.includes("Kindly talk to Support on /contact")) {
      // Clear tokens as user account has issues
      clearTokens();
      
      // Show the specific error message from backend
      toast.error(message);
      
      // Redirect to sign-in after a delay
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
      }, 3000);
      
      return true;
    }
    
    // Handle token expiration or general auth errors
    if (message.includes("expired") || message.includes("Invalid token") || message.includes("Access token required")) {
      clearTokens();
      toast.error("Your session has expired. Please sign in again.");
      
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/sign-in';
        }
      }, 2000);
      
      return true;
    }
  }
  
  return false;
};

/**
 * Generic API error handler that processes different types of errors
 * @param response - The fetch response
 * @param responseData - The parsed response data
 * @param defaultMessage - Default error message to show if no specific handling
 */
export const handleAPIError = (
  response: Response,
  responseData: APIError,
  defaultMessage: string = "An error occurred. Please try again."
): void => {
  // First, try to handle authentication errors
  if (handleAuthenticationError(response, responseData)) {
    return;
  }
  
  // Handle other specific status codes
  switch (response.status) {
    case 400:
      toast.error(responseData.message || "Invalid request. Please check your input.");
      break;
    case 404:
      toast.error(responseData.message || "Resource not found.");
      break;
    case 429:
      toast.error("Too many requests. Please try again later.");
      break;
    case 500:
      toast.error("Server error. Please try again later.");
      break;
    default:
      // Show the message from backend if available, otherwise default
      toast.error(responseData.message || defaultMessage);
  }
};

/**
 * Wrapper for fetch that automatically handles authentication errors
 * @param url - The API endpoint URL
 * @param options - Fetch options
 * @returns Promise<Response>
 */
export const authenticatedFetch = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const response = await fetch(url, options);
  
  // If response is not ok, try to parse error and handle it
  if (!response.ok) {
    try {
      const responseData: APIError = await response.json();
      handleAuthenticationError(response, responseData);
    } catch {
      // If we can't parse the response, just handle generic auth errors
      if (response.status === 401 || response.status === 403) {
        clearTokens();
        toast.error("Authentication failed. Please sign in again.");
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.href = '/sign-in';
          }
        }, 2000);
      }
    }
  }
  
  return response;
};
