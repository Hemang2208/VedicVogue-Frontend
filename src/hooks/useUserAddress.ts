import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { 
  fetchUserAddresses, 
  addUserAddress, 
  updateUserAddress, 
  removeUserAddress,
  clearError,
  clearAddresses,
  backendToFrontendAddress,
  type FrontendAddress
} from '@/redux/slice/user/address.slice';
import { useUserProfile } from './useUserProfile';
import { toast } from 'react-hot-toast';

export const useUserAddress = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useUserProfile();
  
  const { 
    addresses: backendAddresses, 
    loading, 
    error, 
    selectedAddress 
  } = useSelector((state: RootState) => state.userAddress);

  // Convert backend addresses to frontend format for UI
  const addresses: FrontendAddress[] = backendAddresses.map((addr, index) => 
    backendToFrontendAddress(addr, index, profile)
  );

  // Load addresses when user profile is available
  useEffect(() => {
    if (profile?._id && backendAddresses.length === 0 && !loading) {
      dispatch(fetchUserAddresses(profile._id));
    }
  }, [profile?._id, backendAddresses.length, loading, dispatch]);

  // Handle errors with toast notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleAddAddress = async (addressData: Partial<FrontendAddress>) => {
    if (!profile?._id) {
      toast.error('User profile not found');
      return false;
    }

    try {
      await dispatch(addUserAddress({ 
        userId: profile._id, 
        addressData 
      })).unwrap();
      
      toast.success('Address added successfully');
      return true;
    } catch (error) {
      toast.error(error as string);
      return false;
    }
  };

  const handleUpdateAddress = async (
    addressIndex: number, 
    addressData: Partial<FrontendAddress>
  ) => {
    if (!profile?._id) {
      toast.error('User profile not found');
      return false;
    }

    try {
      await dispatch(updateUserAddress({ 
        userId: profile._id, 
        addressIndex, 
        addressData 
      })).unwrap();
      
      toast.success('Address updated successfully');
      return true;
    } catch (error) {
      toast.error(error as string);
      return false;
    }
  };

  const handleRemoveAddress = async (addressIndex: number) => {
    if (!profile?._id) {
      toast.error('User profile not found');
      return false;
    }

    // Prevent removing if it would leave no active addresses
    if (addresses.length <= 1) {
      toast.error('Cannot remove the only address. You must have at least one address.');
      return false;
    }

    // Prevent removing the default address if there are other addresses
    if (addresses[addressIndex]?.isDefault && addresses.length > 1) {
      toast.error('Cannot remove default address. Please set another address as default first.');
      return false;
    }

    try {
      await dispatch(removeUserAddress({ 
        userId: profile._id, 
        addressIndex 
      })).unwrap();
      
      toast.success('Address removed successfully');
      return true;
    } catch (error) {
      toast.error(error as string);
      return false;
    }
  };

  const handleSetDefaultAddress = async (addressIndex: number) => {
    if (!profile?._id || addressIndex >= addresses.length) {
      toast.error('Invalid address selection');
      return false;
    }

    // To set as default, we need to reorder addresses array by moving the selected address to index 0
    // This requires updating all addresses to maintain their relative positions
    const currentAddresses = [...backendAddresses];
    const [selectedAddr] = currentAddresses.splice(addressIndex, 1);
    currentAddresses.unshift(selectedAddr);

    try {
      // Update each address to reflect new positions
      for (let i = 0; i < currentAddresses.length; i++) {
        const frontendAddr = backendToFrontendAddress(currentAddresses[i], i, profile);
        await dispatch(updateUserAddress({
          userId: profile._id,
          addressIndex: i,
          addressData: frontendAddr
        })).unwrap();
      }
      
      toast.success('Default address updated successfully');
      return true;
    } catch (error) {
      toast.error(error as string);
      return false;
    }
  };

  const refreshAddresses = () => {
    if (profile?._id) {
      dispatch(fetchUserAddresses(profile._id));
    }
  };

  const clearAllAddresses = () => {
    dispatch(clearAddresses());
  };

  return {
    addresses,
    backendAddresses,
    loading,
    error,
    selectedAddress,
    handleAddAddress,
    handleUpdateAddress,
    handleRemoveAddress,
    handleSetDefaultAddress,
    refreshAddresses,
    clearAllAddresses,
    clearError: () => dispatch(clearError()),
  };
};
