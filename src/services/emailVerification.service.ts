import { getAccessToken } from '../utils/tokenManager';
import { handleAPIError } from '../utils/apiErrorHandler';
import { encrypt, decrypt } from '../utils/crypto';

export interface VerificationAPIResponse {
  success: boolean;
  message: string;
  data?: {
    email?: string;
    isVerified?: boolean;
    message?: string;
  };
}

/**
 * Send verification OTP to user's email
 */
export const sendVerificationOTP = async (email: string): Promise<VerificationAPIResponse> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      throw new Error('API URL not configured');
    }

    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    // Encrypt the email data
    const encryptedData = encrypt(JSON.stringify({ email }));

    const response = await fetch(`${API_URL}/api/email-verification/send-verification-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: encryptedData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      handleAPIError(response, errorData, 'Failed to send verification OTP');
      throw new Error(errorData.message || 'Failed to send verification OTP');
    }

    const data = await response.json();
    
    return {
      success: data.success,
      message: data.message,
      data: data.data ? JSON.parse(decrypt(data.data)) : null,
    };
  } catch (error) {
    console.error('Error sending verification OTP:', error);
    throw error;
  }
};

/**
 * Verify OTP and update user verification status
 */
export const verifyEmailOTP = async (email: string, otp: string): Promise<VerificationAPIResponse> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      throw new Error('API URL not configured');
    }

    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    // Encrypt the verification data
    const encryptedData = encrypt(JSON.stringify({ email, otp }));

    const response = await fetch(`${API_URL}/api/email-verification/verify-email-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: encryptedData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      handleAPIError(response, errorData, 'Failed to verify email');
      throw new Error(errorData.message || 'Failed to verify email');
    }

    const data = await response.json();
    
    return {
      success: data.success,
      message: data.message,
      data: data.data ? JSON.parse(decrypt(data.data)) : null,
    };
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    throw error;
  }
};
