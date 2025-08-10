import { encrypt } from '@/utils/crypto';

/**
 * Call the backend logout API to invalidate tokens on the server side
 * @param accessToken - The user's access token
 * @param refreshToken - The user's refresh token (optional)
 * @returns Promise<void>
 */
export const logoutUserAPI = async (
  accessToken: string,
  refreshToken?: string
): Promise<void> => {
  try {
    const URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!URL) {
      throw new Error('API URL not configured');
    }

    // Prepare request body with optional refresh token
    const requestBody: { data: string } = {
      data: encrypt(JSON.stringify({ 
        refreshToken: refreshToken || null 
      }))
    };

    const response = await fetch(`${URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Logout API call failed with status ${response.status}`
      );
    }

    // Successfully logged out on backend
    console.log('Successfully logged out from backend');
  } catch (error) {
    console.error('Error calling logout API:', error);
    throw error; // Re-throw to allow caller to handle
  }
};
