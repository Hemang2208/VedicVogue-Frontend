import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from './slice/user/profile.slice';
import userPreferencesReducer from './slice/user/preferences.slice';
import userAddressReducer from './slice/user/address.slice';

export const store = configureStore({
  reducer: {
    userProfile: userProfileReducer,
    userPreferences: userPreferencesReducer,
    userAddress: userAddressReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;