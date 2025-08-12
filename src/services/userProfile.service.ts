import { encrypt, decrypt } from '@/utils/crypto';
import { getAccessToken, getUserData } from '@/utils/tokenManager';
import { UserProfile } from '@/redux/slice/user/profile.slice';
import { handleAPIError } from '@/utils/apiErrorHandler';

/**
 * Fetch user profile by user ID
 * @param userId - The user's ID
 * @returns Promise<UserProfile>
 */
export const getUserProfileAPI = async (userId: string): Promise<UserProfile> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      throw new Error('API URL not configured');
    }

    // Get token using the token manager
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await fetch(`${API_URL}/api/users/get/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Use the global error handler
      handleAPIError(response, errorData, 'Failed to fetch user profile');
      
      throw new Error(errorData.message || 'Failed to fetch user profile');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    return decryptedProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param userId - The user's ID
 * @param profileData - The profile data to update
 * @returns Promise<UserProfile>
 */
export const updateUserProfileAPI = async (
  userId: string, 
  profileData: Partial<UserProfile>
): Promise<UserProfile> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      throw new Error('API URL not configured');
    }

    // Get token using the token manager
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    // Encrypt the profile data
    const encryptedData = encrypt(JSON.stringify(profileData));

    const response = await fetch(`${API_URL}/api/users/update/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ data: encryptedData }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Use the global error handler
      handleAPIError(response, errorData, 'Failed to update user profile');
      
      throw new Error(errorData.message || 'Failed to update user profile');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    return decryptedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Get current user profile from stored user data
 * @returns Promise<UserProfile>
 */
export const getCurrentUserProfileAPI = async (): Promise<UserProfile> => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    
    if (!API_URL) {
      throw new Error('API URL not configured');
    }

    // Get token using the token manager
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    // Get stored user data to get the user ID
    const userData = getUserData();
    if (!userData || !userData._id) {
      throw new Error('No user data found in storage');
    }

    // Fetch user profile with the user ID
    return await getUserProfileAPI(userData._id);
  } catch (error) {
    console.error('Error getting current user profile:', error);
    throw error;
  }
};
