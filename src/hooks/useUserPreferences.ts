import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchUserPreferences,
  updateUserPreferences,
  updateMealPreferences,
  updateNotificationPreferences,
  clearError,
  UserPreferences
} from '@/redux/slice/user/preferences.slice';
import { getUserData } from '@/utils/tokenManager';
import { toast } from 'react-hot-toast';

export const useUserPreferences = () => {
  const dispatch = useAppDispatch();
  const {
    preferences,
    loading,
    error,
    isInitialized
  } = useAppSelector((state) => state.userPreferences);

  const userData = getUserData();
  const userId = userData?._id;

  // Initialize preferences on mount
  useEffect(() => {
    if (userId && !isInitialized && !loading) {
      dispatch(fetchUserPreferences(userId));
    }
  }, [dispatch, userId, isInitialized, loading]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Update all preferences
  const updatePreferences = useCallback(
    async (preferencesData: Partial<UserPreferences>) => {
      if (!userId) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const result = await dispatch(
          updateUserPreferences({ userId, preferences: preferencesData })
        ).unwrap();
        
        toast.success('Preferences updated successfully');
        return result;
      } catch (error) {
        const errorMessage = error as string;
        toast.error(errorMessage || 'Failed to update preferences');
        throw error;
      }
    },
    [dispatch, userId]
  );

  // Update meal preferences only
  const updateMealPrefs = useCallback(
    async (mealPreferences: Partial<UserPreferences['meals']>) => {
      if (!userId) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const result = await dispatch(
          updateMealPreferences({ userId, mealPreferences })
        ).unwrap();
        
        toast.success('Meal preferences updated successfully');
        return result;
      } catch (error) {
        const errorMessage = error as string;
        toast.error(errorMessage || 'Failed to update meal preferences');
        throw error;
      }
    },
    [dispatch, userId]
  );

  // Update notification preferences only
  const updateNotificationPrefs = useCallback(
    async (notificationPreferences: Partial<UserPreferences['notifications']>) => {
      if (!userId) {
        toast.error('User not authenticated');
        return;
      }

      try {
        const result = await dispatch(
          updateNotificationPreferences({ userId, notificationPreferences })
        ).unwrap();
        
        toast.success('Notification preferences updated successfully');
        return result;
      } catch (error) {
        const errorMessage = error as string;
        toast.error(errorMessage || 'Failed to update notification preferences');
        throw error;
      }
    },
    [dispatch, userId]
  );

  // Refresh preferences
  const refreshPreferences = useCallback(() => {
    if (userId) {
      dispatch(fetchUserPreferences(userId));
    }
  }, [dispatch, userId]);

  return {
    preferences,
    loading,
    error,
    isInitialized,
    updatePreferences,
    updateMealPrefs,
    updateNotificationPrefs,
    refreshPreferences,
  };
};
