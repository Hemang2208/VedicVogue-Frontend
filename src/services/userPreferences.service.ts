import { encrypt, decrypt } from '@/utils/crypto';
import { getAccessToken, getUserData } from '@/utils/tokenManager';
import { UserPreferences } from '@/redux/slice/user/preferences.slice';

/**
 * Fetch user preferences by user ID
 * @param userId - The user's ID
 * @returns Promise<UserPreferences>
 */
export const getUserPreferencesAPI = async (userId: string): Promise<UserPreferences> => {
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
      throw new Error(errorData.message || 'Failed to fetch user preferences');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    // Return only preferences
    return decryptedProfile.preferences;
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    throw error;
  }
};

/**
 * Update user preferences
 * @param userId - The user's ID
 * @param preferences - The preferences data to update
 * @returns Promise<UserPreferences>
 */
export const updateUserPreferencesAPI = async (
  userId: string, 
  preferences: Partial<UserPreferences>
): Promise<UserPreferences> => {
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

    // Encrypt the preferences data
    const encryptedData = encrypt(JSON.stringify({ preferences }));

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
      throw new Error(errorData.message || 'Failed to update user preferences');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    // Return only preferences
    return decryptedProfile.preferences;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    throw error;
  }
};

/**
 * Update only meal preferences
 * @param userId - The user's ID
 * @param mealPreferences - The meal preferences data to update
 * @param currentPreferences - Current user preferences to merge with
 * @returns Promise<UserPreferences>
 */
export const updateMealPreferencesAPI = async (
  userId: string, 
  mealPreferences: Partial<UserPreferences['meals']>,
  currentPreferences: UserPreferences
): Promise<UserPreferences> => {
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

    // Merge with current preferences
    const updatedPreferences = {
      preferences: {
        ...currentPreferences,
        meals: {
          ...currentPreferences.meals,
          ...mealPreferences
        }
      }
    };

    // Encrypt the preferences data
    const encryptedData = encrypt(JSON.stringify(updatedPreferences));

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
      throw new Error(errorData.message || 'Failed to update meal preferences');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    // Return only preferences
    return decryptedProfile.preferences;
  } catch (error) {
    console.error('Error updating meal preferences:', error);
    throw error;
  }
};

/**
 * Update only notification preferences
 * @param userId - The user's ID
 * @param notificationPreferences - The notification preferences data to update
 * @param currentPreferences - Current user preferences to merge with
 * @returns Promise<UserPreferences>
 */
export const updateNotificationPreferencesAPI = async (
  userId: string, 
  notificationPreferences: Partial<UserPreferences['notifications']>,
  currentPreferences: UserPreferences
): Promise<UserPreferences> => {
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

    // Merge with current preferences
    const updatedPreferences = {
      preferences: {
        ...currentPreferences,
        notifications: {
          ...currentPreferences.notifications,
          ...notificationPreferences
        }
      }
    };

    // Encrypt the preferences data
    const encryptedData = encrypt(JSON.stringify(updatedPreferences));

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
      throw new Error(errorData.message || 'Failed to update notification preferences');
    }

    const data = await response.json();
    
    // Decrypt the response data
    const decryptedProfile = JSON.parse(decrypt(data.data));
    
    // Return only preferences
    return decryptedProfile.preferences;
  } catch (error) {
    console.error('Error updating notification preferences:', error);
    throw error;
  }
};

/**
 * Get current user preferences from stored user data
 * @returns Promise<UserPreferences>
 */
export const getCurrentUserPreferencesAPI = async (): Promise<UserPreferences> => {
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

    // Fetch user preferences with the user ID
    return await getUserPreferencesAPI(userData._id);
  } catch (error) {
    console.error('Error getting current user preferences:', error);
    throw error;
  }
};
