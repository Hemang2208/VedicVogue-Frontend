// Import crypto utilities
import { decrypt } from "@/utils/crypto";

// Types for menu items and API responses
export interface MenuItem {
  _id?: string;
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "veg" | "fitness" | "office" | "diet" | "addons";
  calories: number;
  prepTime: string;
  tags: string[];
  dietary: string[];
  rating: number;
  reviews: number;
  nutritionScore: number;
  spiceLevel: number;
  ingredients: string[];
  allergens: string[];
  availability: boolean;
  createdAt?: string;
  updatedAt?: string;
  discountPercentage?: number;
  savings?: number;
}

export interface MenuAPIResponse {
  success: boolean;
  message: string;
  data: MenuItem[] | MenuItem | MenuPaginatedResponse;
}

export interface MenuCategoryResponse {
  success: boolean;
  message: string;
  data: MenuCategory[];
}

export interface BulkUpdateResponse {
  success: boolean;
  message: string;
  data: { success: number; failed: number; errors: string[] };
}

export interface MenuPaginatedResponse {
  items: MenuItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MenuFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  dietary?: string[];
  spiceLevel?: number;
  isVegetarian?: boolean;
  isAvailable?: boolean;
  minRating?: number;
  minNutritionScore?: number;
  sortBy?: "popular" | "rating" | "price-low" | "price-high" | "calories" | "nutrition" | "name" | "newest";
  page?: number;
  limit?: number;
}

export interface MenuCategory {
  category: string;
  count: number;
}

class MenuService {
  private static readonly baseURL = process.env.NEXT_PUBLIC_API_URL;

  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api/menu${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      headers: defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
      }

      const result = await response.json();
      
      console.log('Raw API response:', result);
      
      // If the response contains encrypted data, decrypt it
      if (result.success && result.data && typeof result.data === 'string') {
        try {
          console.log('Attempting to decrypt response data...');
          const decryptedData = decrypt(result.data);
          console.log('Decrypted data:', decryptedData);
          result.data = JSON.parse(decryptedData);
          console.log('Parsed decrypted data:', result.data);
        } catch (decryptError) {
          console.error('Failed to decrypt response data:', decryptError);
          // If decryption fails, try to use the data as-is
          // This handles cases where some endpoints might not encrypt data
        }
      }

      console.log('Final processed result:', result);
      return result;
    } catch (error) {
      console.error(`Menu API Error (${endpoint}):`, error);
      throw error;
    }
  }

  /**
   * Get all menu items with optional filters
   */
  static async getMenuItems(filters: MenuFilters = {}): Promise<MenuPaginatedResponse> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const endpoint = queryParams.toString() ? `?${queryParams.toString()}` : '';
    const response = await this.makeRequest<MenuAPIResponse>(endpoint);
    
    if (response.success && response.data) {
      return response.data as MenuPaginatedResponse;
    }
    
    throw new Error(response.message || 'Failed to fetch menu items');
  }

  /**
   * Get menu item by ID
   */
  static async getMenuItemById(id: string): Promise<MenuItem> {
    const response = await this.makeRequest<MenuAPIResponse>(`/${id}`);
    
    if (response.success && response.data) {
      return response.data as MenuItem;
    }
    
    throw new Error(response.message || 'Failed to fetch menu item');
  }

  /**
   * Search menu items
   */
  static async searchMenuItems(
    searchTerm: string,
    filters: Omit<MenuFilters, 'search'> = {}
  ): Promise<MenuPaginatedResponse> {
    const queryParams = new URLSearchParams();
    queryParams.append('q', searchTerm);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(','));
        } else {
          queryParams.append(key, value.toString());
        }
      }
    });

    const response = await this.makeRequest<MenuAPIResponse>(
      `/search?${queryParams.toString()}`
    );
    
    if (response.success && response.data) {
      return response.data as MenuPaginatedResponse;
    }
    
    throw new Error(response.message || 'Failed to search menu items');
  }

  /**
   * Get menu categories with counts
   */
  static async getMenuCategories(): Promise<MenuCategory[]> {
    const response = await this.makeRequest<MenuCategoryResponse>('/categories');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch menu categories');
  }

  /**
   * Get featured menu items
   */
  static async getFeaturedItems(limit: number = 6): Promise<MenuItem[]> {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', limit.toString());
    
    const response = await this.makeRequest<MenuAPIResponse>(
      `/featured?${queryParams.toString()}`
    );
    
    if (response.success && response.data) {
      return response.data as MenuItem[];
    }
    
    throw new Error(response.message || 'Failed to fetch featured items');
  }

  /**
   * Create menu item (Admin only)
   */
  static async createMenuItem(
    menuItem: Omit<MenuItem, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'reviews'>,
    accessToken?: string
  ): Promise<MenuItem> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<MenuAPIResponse>('', {
      method: 'POST',
      headers,
      body: JSON.stringify(menuItem),
    });
    
    if (response.success && response.data) {
      return response.data as MenuItem;
    }
    
    throw new Error(response.message || 'Failed to create menu item');
  }

  /**
   * Update menu item (Admin only)
   */
  static async updateMenuItem(
    id: string,
    updates: Partial<MenuItem>,
    accessToken?: string
  ): Promise<MenuItem> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<MenuAPIResponse>(`/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updates),
    });
    
    if (response.success && response.data) {
      return response.data as MenuItem;
    }
    
    throw new Error(response.message || 'Failed to update menu item');
  }

  /**
   * Delete menu item (Admin only)
   */
  static async deleteMenuItem(id: string, accessToken?: string): Promise<boolean> {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<MenuAPIResponse>(`/${id}`, {
      method: 'DELETE',
      headers,
    });
    
    return response.success;
  }

  /**
   * Toggle menu item availability (Admin only)
   */
  static async toggleAvailability(id: string, accessToken?: string): Promise<MenuItem> {
    const headers: Record<string, string> = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<MenuAPIResponse>(`/${id}/toggle-availability`, {
      method: 'PATCH',
      headers,
    });
    
    if (response.success && response.data) {
      return response.data as MenuItem;
    }
    
    throw new Error(response.message || 'Failed to toggle availability');
  }

  /**
   * Update menu item rating (User)
   */
  static async updateRating(
    id: string,
    rating: number,
    accessToken?: string
  ): Promise<MenuItem> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<MenuAPIResponse>(`/${id}/rating`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ rating }),
    });
    
    if (response.success && response.data) {
      return response.data as MenuItem;
    }
    
    throw new Error(response.message || 'Failed to update rating');
  }

  /**
   * Bulk update menu items (Admin only)
   */
  static async bulkUpdateItems(
    updates: Array<{ id: string; data: Partial<MenuItem> }>,
    accessToken?: string
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    const response = await this.makeRequest<BulkUpdateResponse>('/bulk-update', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ updates }),
    });
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to perform bulk update');
  }
}

export default MenuService;
