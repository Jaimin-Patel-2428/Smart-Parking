import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../Authentication-UI/Context/AuthContext';
import profileService from '../Services/profileService';

export const useProfile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    
    try {
      setLoading(true);
      setError(null);
      const { data } = await profileService.getProfile();
      setProfile(data.profile);
      setVehicles(data.vehicles || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async (data) => {
    try {
      setUpdating(true);
      setError(null);
      const response = await profileService.updateProfile(data);
      setProfile(response.data.profile);
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Update failed';
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setUpdating(false);
    }
  };

  const addVehicle = async (vehicleData) => {
    try {
      setError(null);
      const response = await profileService.addVehicle(vehicleData);
      setVehicles([response.data.vehicle, ...vehicles]);
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Add vehicle failed';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    try {
      setError(null);
      const response = await profileService.updateVehicle(id, vehicleData);
      setVehicles(vehicles.map(v => v._id === id ? response.data.vehicle : v));
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Update vehicle failed';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const deleteVehicle = async (id) => {
    try {
      setError(null);
      await profileService.deleteVehicle(id);
      setVehicles(vehicles.filter(v => v._id !== id));
      return { success: true };
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Delete vehicle failed';
      setError(errMsg);
      return { success: false, error: errMsg };
    }
  };

  const refreshProfile = () => fetchProfile();

  return {
    profile,
    vehicles,
    loading,
    error,
    updating,
    updateProfile,
    addVehicle,
    updateVehicle,
    deleteVehicle,
    refreshProfile
  };
};

export default useProfile;
