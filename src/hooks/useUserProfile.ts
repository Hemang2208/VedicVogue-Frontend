import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile } from '@/redux/slice/user/profile.slice';
import { getUserData, getAccessToken } from '@/utils/tokenManager';
import { toast } from 'react-hot-toast';

/**
 * Custom hook to manage user profile
 * Handles fetching profile data on mount and provides profile state
 */
export const useUserProfile = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error } = useAppSelector((state) => state.userProfile);

  // Function to load user profile
  const loadUserProfile = useCallback(async () => {
    try {
      // Check if user is authenticated
      const token = getAccessToken();
      if (!token) {
        toast.error('Please login to view your profile');
        return;
      }

      // Get stored user data to get the user ID
      const userData = getUserData();
      if (!userData || !userData._id) {
        toast.error('No user data found. Please login again.');
        return;
      }

      // Fetch user profile using Redux thunk
      await dispatch(fetchUserProfile(userData._id)).unwrap();
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Don't show error toast here as Redux will handle it
    }
  }, [dispatch]);

  // Auto-load profile on mount
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // Function to refresh profile data
  const refreshProfile = () => {
    loadUserProfile();
  };

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = getAccessToken();
    const userData = getUserData();
    return !!(token && userData);
  };

  return {
    profile,
    loading,
    error,
    refreshProfile,
    isAuthenticated: isAuthenticated(),
  };
};
