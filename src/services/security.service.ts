import { encrypt, decrypt } from '@/utils/crypto';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Types
interface SecuritySettings {
  twoFactorAuth?: boolean;
  loginNotifications?: boolean;
  sessionTimeout?: boolean;
  deviceTracking?: boolean;
  passwordExpiry?: boolean;
}

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
};

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
};

// Security Settings API
export const securityAPI = {
  // Get security settings
  getSettings: async () => {
    const response = await fetch(`${API_URL}/api/security/settings`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    return JSON.parse(decrypt(data.data));
  },

  // Update security settings
  updateSettings: async (settings: SecuritySettings) => {
    const encryptedData = encrypt(JSON.stringify(settings));
    
    const response = await fetch(`${API_URL}/api/security/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ data: encryptedData }),
    });
    
    const data = await handleResponse(response);
    return JSON.parse(decrypt(data.data));
  },

  // Change password
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    const encryptedData = encrypt(JSON.stringify(passwordData));
    
    const response = await fetch(`${API_URL}/api/security/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ data: encryptedData }),
    });
    
    return await handleResponse(response);
  },

  // Get active sessions
  getSessions: async () => {
    const response = await fetch(`${API_URL}/api/security/sessions`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    return JSON.parse(decrypt(data.data));
  },

  // Terminate specific session
  terminateSession: async (sessionId: string) => {
    const response = await fetch(`${API_URL}/api/security/sessions/${sessionId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  },

  // Terminate all other sessions
  terminateAllSessions: async () => {
    const response = await fetch(`${API_URL}/api/security/sessions`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    
    return await handleResponse(response);
  },

  // Get security activity
  getActivity: async (params: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
  } = {}) => {
    const queryParams = new URLSearchParams({
      page: (params.page || 1).toString(),
      limit: (params.limit || 20).toString(),
      ...(params.type && { type: params.type }),
      ...(params.status && { status: params.status }),
    });
    
    const response = await fetch(`${API_URL}/api/security/activity?${queryParams}`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });
    
    const data = await handleResponse(response);
    return JSON.parse(decrypt(data.data));
  },
};

export default securityAPI;
