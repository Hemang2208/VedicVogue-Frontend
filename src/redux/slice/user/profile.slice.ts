import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { decrypt, encrypt } from '@/utils/crypto';

// Define the user profile interface based on backend model
export interface UserProfile {
  _id: string;
  userID: string;
  fullname: string;
  account: {
    email: string;
    phone: string;
    gender?: "male" | "female" | "other";
    profilePictureUrl?: string;
  };
  addresses: Array<{
    label: string;
    houseNumber: string;
    street: string;
    area: string;
    landmark?: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  }>;
  activity: {
    memberSince: Date;
    favorites: Array<{
      kitchens: string;
      dishes: string[];
    }>;
    cart: Array<{
      item: string;
      quantity: number;
    }>;
    orders: string[];
    contacts: string[];
    loyaltyPoints: number;
  };
  preferences: {
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
  };
  status: {
    ban: {
      isBanned: boolean;
      banReason: string | null;
      bannedAt: Date | null;
    };
    isVerified: boolean;
    isActive: boolean;
    isDeleted: boolean;
    deletedAt: Date | null;
  };
  security: {
    role?: "user" | "admin" | "captain" | "kitchen";
  };
  lastLogin: Date;
  lastLogout: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

// Define the state interface
interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserProfileState = {
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchProfile',
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
        throw new Error(errorData.message || 'Failed to fetch user profile');
      }

      const data = await response.json();
      
      // Decrypt the response data
      const decryptedProfile = JSON.parse(decrypt(data.data));
      
      return decryptedProfile;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk(
  'userProfile/updateProfile',
  async ({ userId, profileData }: { userId: string; profileData: Partial<UserProfile> }, { rejectWithValue }) => {
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
        throw new Error(errorData.message || 'Failed to update user profile');
      }

      const data = await response.json();
      
      // Decrypt the response data
      const decryptedProfile = JSON.parse(decrypt(data.data));
      
      return decryptedProfile;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error occurred');
    }
  }
);

// Create the slice
const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateLocalProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch user profile cases
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      // Update user profile cases
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearProfile, setAuthenticated, clearError, updateLocalProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;