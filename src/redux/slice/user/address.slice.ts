import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { decrypt, encrypt } from "@/utils/crypto";

// Define the address interface based on backend model
export interface UserAddress {
  _id?: string; // MongoDB generated ID for the address
  label: string; // e.g., "Home", "Office", "Other"
  houseNumber: string; // House/Flat number
  street: string; // Street name
  area: string; // Area/Sector
  landmark?: string; // Optional landmark
  city: string;
  state: string;
  zipcode: string; // PIN code
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isDeleted?: boolean;
  deletedAt?: Date | null;
}

// Frontend-specific address interface for UI
export interface FrontendAddress {
  id: string;
  type: string; // Maps to label in backend
  name?: string; // Custom name for the address
  fullName: string; // Contact person name
  phone: string; // Contact phone number
  addressLine1: string; // Maps to houseNumber + street
  addressLine2?: string; // Maps to area
  city: string;
  state: string;
  pincode: string; // Maps to zipcode
  country: string; // Maps to country
  landmark?: string;
  isDefault: boolean; // First address is considered default
}

// Define the state interface
interface AddressState {
  addresses: UserAddress[];
  loading: boolean;
  error: string | null;
  selectedAddress: UserAddress | null;
}

// Initial state
const initialState: AddressState = {
  addresses: [],
  loading: false,
  error: null,
  selectedAddress: null,
};

// Helper function to convert backend address to frontend format
export const backendToFrontendAddress = (
  backendAddr: UserAddress,
  index: number,
  userProfile: { fullname?: string; account?: { phone?: string } } | null = null
): FrontendAddress => {
  return {
    id: index.toString(),
    type: backendAddr.label.toLowerCase(),
    name: backendAddr.label,
    fullName: userProfile?.fullname || "",
    phone: userProfile?.account?.phone || "",
    addressLine1: `${backendAddr.houseNumber}, ${backendAddr.street}`,
    addressLine2: backendAddr.area,
    city: backendAddr.city,
    state: backendAddr.state,
    pincode: backendAddr.zipcode,
    country: backendAddr.country || "India",
    landmark: backendAddr.landmark,
    isDefault: index === 0, // First address is default
  };
};

// Helper function to convert frontend address to backend format
export const frontendToBackendAddress = (
  frontendAddr: Partial<FrontendAddress>
): Partial<UserAddress> => {
  // Parse address line 1 to extract house number and street
  const addressLine1Parts = frontendAddr.addressLine1?.split(",") || ["", ""];
  const houseNumber = addressLine1Parts[0]?.trim() || "";
  const street =
    addressLine1Parts.slice(1).join(",").trim() ||
    frontendAddr.addressLine1 ||
    "";

  return {
    label:
      (frontendAddr.type
        ? frontendAddr.type.charAt(0).toUpperCase() + frontendAddr.type.slice(1)
        : null) ||
      frontendAddr.name ||
      "Home",
    houseNumber,
    street,
    area: frontendAddr.addressLine2 || "",
    landmark: frontendAddr.landmark,
    city: frontendAddr.city || "",
    state: frontendAddr.state || "",
    zipcode: frontendAddr.pincode || "",
    country: frontendAddr.country || "India",
  };
};

// Async thunk to fetch user addresses
export const fetchUserAddresses = createAsyncThunk(
  "userAddress/fetchAddresses",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { getAccessToken } = await import("@/utils/tokenManager");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL not configured");
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(`${API_URL}/api/users/get/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch user addresses");
      }

      const data = await response.json();

      // Decrypt the response data
      const decryptedProfile = JSON.parse(decrypt(data.data));

      // Filter out soft-deleted addresses
      const activeAddresses = (decryptedProfile.addresses || []).filter(
        (address: UserAddress) => !address.isDeleted
      );

      return activeAddresses;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Async thunk to add new address
export const addUserAddress = createAsyncThunk(
  "userAddress/addAddress",
  async (
    {
      userId,
      addressData,
    }: { userId: string; addressData: Partial<FrontendAddress> },
    { rejectWithValue }
  ) => {
    try {
      const { getAccessToken } = await import("@/utils/tokenManager");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL not configured");
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found");
      }

      // Convert frontend address format to backend format
      const backendAddress = frontendToBackendAddress(addressData);

      // Encrypt the address data
      const encryptedData = encrypt(JSON.stringify(backendAddress));

      const response = await fetch(
        `${API_URL}/api/users/add-address/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: encryptedData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add address");
      }

      const data = await response.json();

      // Decrypt the response data for addUserAddress
      const decryptedUser = JSON.parse(decrypt(data.data));

      // Filter out soft-deleted addresses
      const activeAddresses = (decryptedUser.addresses || []).filter(
        (address: UserAddress) => !address.isDeleted
      );

      return activeAddresses;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Async thunk to update address
export const updateUserAddress = createAsyncThunk(
  "userAddress/updateAddress",
  async (
    {
      userId,
      addressIndex,
      addressData,
    }: {
      userId: string;
      addressIndex: number;
      addressData: Partial<FrontendAddress>;
    },
    { rejectWithValue }
  ) => {
    try {
      const { getAccessToken } = await import("@/utils/tokenManager");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL not configured");
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found");
      }

      // Convert frontend address format to backend format
      const backendAddress = frontendToBackendAddress(addressData);

      // Encrypt the address data
      const encryptedData = encrypt(JSON.stringify(backendAddress));

      const response = await fetch(
        `${API_URL}/api/users/update-address/${userId}/${addressIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ data: encryptedData }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update address");
      }

      const data = await response.json();

      // Decrypt the response data for updateUserAddress
      const decryptedUser = JSON.parse(decrypt(data.data));

      // Filter out soft-deleted addresses
      const activeAddresses = (decryptedUser.addresses || []).filter(
        (address: UserAddress) => !address.isDeleted
      );

      return activeAddresses;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Async thunk to remove address
export const removeUserAddress = createAsyncThunk(
  "userAddress/removeAddress",
  async (
    { userId, addressIndex }: { userId: string; addressIndex: number },
    { rejectWithValue }
  ) => {
    try {
      const { getAccessToken } = await import("@/utils/tokenManager");
      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      if (!API_URL) {
        throw new Error("API URL not configured");
      }

      // Get token using the token manager
      const token = getAccessToken();
      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        `${API_URL}/api/users/remove-address/${userId}/${addressIndex}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to remove address");
      }

      const data = await response.json();

      // Decrypt the response data for removeUserAddress
      const decryptedUser = JSON.parse(decrypt(data.data));

      // Filter out soft-deleted addresses
      const activeAddresses = (decryptedUser.addresses || []).filter(
        (address: UserAddress) => !address.isDeleted
      );

      return activeAddresses;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
);

// Create the slice
const userAddressSlice = createSlice({
  name: "userAddress",
  initialState,
  reducers: {
    clearAddresses: (state) => {
      state.addresses = [];
      state.loading = false;
      state.error = null;
      state.selectedAddress = null;
    },
    setSelectedAddress: (state, action: PayloadAction<UserAddress | null>) => {
      state.selectedAddress = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    // Local state management for optimistic updates
    addLocalAddress: (state, action: PayloadAction<UserAddress>) => {
      state.addresses.push(action.payload);
    },
    updateLocalAddress: (
      state,
      action: PayloadAction<{ index: number; address: UserAddress }>
    ) => {
      const { index, address } = action.payload;
      if (state.addresses[index]) {
        state.addresses[index] = address;
      }
    },
    removeLocalAddress: (state, action: PayloadAction<number>) => {
      state.addresses.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses cases
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add address cases
      .addCase(addUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(addUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update address cases
      .addCase(updateUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove address cases
      .addCase(removeUserAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUserAddress.fulfilled, (state, action) => {
        state.loading = false;
        // Update addresses with filtered active addresses from backend
        state.addresses = action.payload;
        state.error = null;
      })
      .addCase(removeUserAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  clearAddresses,
  setSelectedAddress,
  clearError,
  addLocalAddress,
  updateLocalAddress,
  removeLocalAddress,
} = userAddressSlice.actions;

export default userAddressSlice.reducer;
