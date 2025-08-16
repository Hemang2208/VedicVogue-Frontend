import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { decrypt, encrypt } from '@/utils/crypto';
import { getAccessToken } from '@/utils/tokenManager';

// Define interfaces
export interface SecuritySettings {
  twoFactorAuth: boolean;
  loginNotifications: boolean;
  sessionTimeout: boolean;
  deviceTracking: boolean;
  passwordExpiry: boolean;
}

export interface SessionData {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
  ip: string;
}

export interface SecurityActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
  status: string;
  location: string;
  device?: string;
  ip?: string;
}

export interface SecurityState {
  settings: SecuritySettings;
  sessions: SessionData[];
  activities: SecurityActivity[];
  loading: {
    settings: boolean;
    sessions: boolean;
    activities: boolean;
    passwordChange: boolean;
  };
  error: string | null;
  activityPagination: {
    page: number;
    totalPages: number;
    total: number;
  };
}

// Initial state
const initialState: SecurityState = {
  settings: {
    twoFactorAuth: false,
    loginNotifications: true,
    sessionTimeout: true,
    deviceTracking: true,
    passwordExpiry: false,
  },
  sessions: [],
  activities: [],
  loading: {
    settings: false,
    sessions: false,
    activities: false,
    passwordChange: false,
  },
  error: null,
  activityPagination: {
    page: 1,
    totalPages: 1,
    total: 0,
  },
};

// Helper function to make API calls
const makeSecureAPICall = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAccessToken();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!token) {
    throw new Error('No access token found');
  }

  const response = await fetch(`${baseUrl}/api/security${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// Async thunks
export const fetchSecuritySettings = createAsyncThunk(
  'security/fetchSettings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeSecureAPICall('/settings');
      const decryptedData = JSON.parse(decrypt(response.data));
      return decryptedData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch security settings'
      );
    }
  }
);

export const updateSecuritySettings = createAsyncThunk(
  'security/updateSettings',
  async (settings: Partial<SecuritySettings>, { rejectWithValue }) => {
    try {
      const encryptedData = encrypt(JSON.stringify(settings));
      const response = await makeSecureAPICall('/settings', {
        method: 'PUT',
        body: JSON.stringify({ data: encryptedData }),
      });
      const decryptedData = JSON.parse(decrypt(response.data));
      return decryptedData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to update security settings'
      );
    }
  }
);

export const changePassword = createAsyncThunk(
  'security/changePassword',
  async (
    { currentPassword, newPassword }: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const encryptedData = encrypt(JSON.stringify({ currentPassword, newPassword }));
      await makeSecureAPICall('/change-password', {
        method: 'POST',
        body: JSON.stringify({ data: encryptedData }),
      });
      return { success: true };
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to change password'
      );
    }
  }
);

export const fetchActiveSessions = createAsyncThunk(
  'security/fetchSessions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeSecureAPICall('/sessions');
      const decryptedData = JSON.parse(decrypt(response.data));
      return decryptedData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch active sessions'
      );
    }
  }
);

export const terminateSession = createAsyncThunk(
  'security/terminateSession',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      await makeSecureAPICall(`/sessions/${sessionId}`, {
        method: 'DELETE',
      });
      return sessionId;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to terminate session'
      );
    }
  }
);

export const terminateAllSessions = createAsyncThunk(
  'security/terminateAllSessions',
  async (_, { rejectWithValue }) => {
    try {
      await makeSecureAPICall('/sessions', {
        method: 'DELETE',
      });
      return true;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to terminate all sessions'
      );
    }
  }
);

export const fetchSecurityActivity = createAsyncThunk(
  'security/fetchActivity',
  async (
    { page = 1, limit = 20, type, status }: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(type && { type }),
        ...(status && { status }),
      });
      
      const response = await makeSecureAPICall(`/activity?${params}`);
      const decryptedData = JSON.parse(decrypt(response.data));
      return decryptedData;
    } catch (error: unknown) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to fetch security activity'
      );
    }
  }
);

// Create slice
const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetSecurityState: () => initialState,
  },
  extraReducers: (builder) => {
    // Fetch Security Settings
    builder
      .addCase(fetchSecuritySettings.pending, (state) => {
        state.loading.settings = true;
        state.error = null;
      })
      .addCase(fetchSecuritySettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        state.settings = action.payload;
      })
      .addCase(fetchSecuritySettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error = action.payload as string;
      });

    // Update Security Settings
    builder
      .addCase(updateSecuritySettings.pending, (state) => {
        state.loading.settings = true;
        state.error = null;
      })
      .addCase(updateSecuritySettings.fulfilled, (state, action) => {
        state.loading.settings = false;
        state.settings = action.payload;
      })
      .addCase(updateSecuritySettings.rejected, (state, action) => {
        state.loading.settings = false;
        state.error = action.payload as string;
      });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading.passwordChange = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading.passwordChange = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading.passwordChange = false;
        state.error = action.payload as string;
      });

    // Fetch Active Sessions
    builder
      .addCase(fetchActiveSessions.pending, (state) => {
        state.loading.sessions = true;
        state.error = null;
      })
      .addCase(fetchActiveSessions.fulfilled, (state, action) => {
        state.loading.sessions = false;
        state.sessions = action.payload;
      })
      .addCase(fetchActiveSessions.rejected, (state, action) => {
        state.loading.sessions = false;
        state.error = action.payload as string;
      });

    // Terminate Session
    builder
      .addCase(terminateSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(session => session.id !== action.payload);
      })
      .addCase(terminateSession.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Terminate All Sessions
    builder
      .addCase(terminateAllSessions.fulfilled, (state) => {
        state.sessions = state.sessions.filter(session => session.current);
      })
      .addCase(terminateAllSessions.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Fetch Security Activity
    builder
      .addCase(fetchSecurityActivity.pending, (state) => {
        state.loading.activities = true;
        state.error = null;
      })
      .addCase(fetchSecurityActivity.fulfilled, (state, action) => {
        state.loading.activities = false;
        state.activities = action.payload.activities;
        state.activityPagination = {
          page: action.payload.page,
          totalPages: action.payload.totalPages,
          total: action.payload.total,
        };
      })
      .addCase(fetchSecurityActivity.rejected, (state, action) => {
        state.loading.activities = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetSecurityState } = securitySlice.actions;
export default securitySlice.reducer;
