import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { decrypt, encrypt } from '@/utils/crypto';

// Import RootState type
import type { RootState } from '../../store';

// Define the preferences interface based on backend model
export interface UserPreferences {
  meals: {
    type: string;
    spice: string;
    restrictions: string;
    message: string;
  };
  notifications: {
    order: boolean;
    reminders: boolean;
    menu: boolean;
    promotions: boolean;
  };
  paymentMethod: string[];
}

// Define the state interface
interface UserPreferencesState {
  preferences: UserPreferences | null;
  loading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Initial state
const initialState: UserPreferencesState = {
  preferences: null,
  loading: false,
  error: null,
  isInitialized: false,
};

// Async thunk to fetch user preferences
export const fetchUserPreferences = createAsyncThunk(
  'userPreferences/fetchPreferences',
  async (userId: string, { rejectWithValue }) => {
    try {
      const { getAccessToken } = await import('@/utils/tokenManager');
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
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Async thunk to update user preferences
export const updateUserPreferences = createAsyncThunk(
  'userPreferences/updatePreferences',
  async ({ userId, preferences }: { userId: string; preferences: Partial<UserPreferences> }, { rejectWithValue }) => {
    try {
      const { getAccessToken } = await import('@/utils/tokenManager');
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
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Async thunk to update meal preferences only
export const updateMealPreferences = createAsyncThunk(
  'userPreferences/updateMealPreferences',
  async ({ userId, mealPreferences }: { userId: string; mealPreferences: Partial<UserPreferences['meals']> }, { rejectWithValue, getState }) => {
    try {
      const { getAccessToken } = await import('@/utils/tokenManager');
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      
      if (!API_URL) {
        throw new Error('API URL not configured');
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error('No access token found');
      }

      // Get current state to merge with new preferences
      const state = getState() as RootState;
      const currentPreferences = state.userPreferences.preferences;
      
      const updatedPreferences = {
        preferences: {
          ...currentPreferences,
          meals: {
            ...currentPreferences?.meals,
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
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Async thunk to update notification preferences only
export const updateNotificationPreferences = createAsyncThunk(
  'userPreferences/updateNotificationPreferences',
  async ({ userId, notificationPreferences }: { userId: string; notificationPreferences: Partial<UserPreferences['notifications']> }, { rejectWithValue, getState }) => {
    try {
      const { getAccessToken } = await import('@/utils/tokenManager');
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      
      if (!API_URL) {
        throw new Error('API URL not configured');
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error('No access token found');
      }

      // Get current state to merge with new preferences
      const state = getState() as RootState;
      const currentPreferences = state.userPreferences.preferences;
      
      const updatedPreferences = {
        preferences: {
          ...currentPreferences,
          notifications: {
            ...currentPreferences?.notifications,
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
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Create the slice
const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState,
  reducers: {
    clearPreferences: (state) => {
      state.preferences = null;
      state.loading = false;
      state.error = null;
      state.isInitialized = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLocalPreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.preferences) {
        state.preferences = { ...state.preferences, ...action.payload };
      }
    },
    updateLocalMealPreferences: (state, action: PayloadAction<Partial<UserPreferences['meals']>>) => {
      if (state.preferences) {
        state.preferences.meals = { ...state.preferences.meals, ...action.payload };
      }
    },
    updateLocalNotificationPreferences: (state, action: PayloadAction<Partial<UserPreferences['notifications']>>) => {
      if (state.preferences) {
        state.preferences.notifications = { ...state.preferences.notifications, ...action.payload };
      }
    },
    setPreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
      state.isInitialized = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user preferences cases
      .addCase(fetchUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.isInitialized = true;
        state.error = null;
      })
      .addCase(fetchUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update user preferences cases
      .addCase(updateUserPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.error = null;
      })
      .addCase(updateUserPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update meal preferences cases
      .addCase(updateMealPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMealPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.error = null;
      })
      .addCase(updateMealPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update notification preferences cases
      .addCase(updateNotificationPreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNotificationPreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload;
        state.error = null;
      })
      .addCase(updateNotificationPreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearPreferences, 
  clearError, 
  updateLocalPreferences, 
  updateLocalMealPreferences, 
  updateLocalNotificationPreferences,
  setPreferences
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;
