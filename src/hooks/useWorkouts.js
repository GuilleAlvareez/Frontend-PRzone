import { useState, useEffect, useCallback } from 'react';
import { workoutService } from '../services/workoutServices';

export function useWorkouts(userId) {
  const [workouts, setWorkouts] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);
  const [selectedWorkoutDetails, setSelectedWorkoutDetails] = useState(null);
  const [consecutiveDays, setConsecutiveDays] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllWorkouts = useCallback(async () => {
    if (!userId) { setWorkouts([]); return; }
    setIsLoading(true);
    setError(null);
    try {
      const data = await workoutService.getWorkouts(userId);
      setWorkouts(data.results || []);
    } catch (err) {
      setError(err);
      setWorkouts([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchRecent = useCallback(async () => {
    if (!userId) { setRecentWorkouts([]); return; }
    try {
      const data = await workoutService.getRecentWorkouts(userId);
      setRecentWorkouts(data.results || []);
    } catch (err) { console.error("Error fetching recent workouts:", err); }
  }, [userId]);

  const fetchConsecutive = useCallback(async () => {
    if (!userId) { setConsecutiveDays(0); return; }
    try {
      const data = await workoutService.getConsecutiveDays(userId);
      setConsecutiveDays(data.diasConsecutivos || 0);
    } catch (err) { console.error("Error fetching consecutive days:", err); }
  }, [userId]);

  useEffect(() => {
    fetchAllWorkouts();
    fetchRecent();
    fetchConsecutive();
  }, [fetchAllWorkouts, fetchRecent, fetchConsecutive]);

  const addWorkout = useCallback(async (workoutData) => {
    try {
      await workoutService.createWorkout(workoutData);
      await Promise.all([fetchAllWorkouts(), fetchRecent()]);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [fetchAllWorkouts, fetchRecent]);

  const removeWorkout = useCallback(async (workoutId) => {
    try {
      await workoutService.deleteWorkout(workoutId);
      await Promise.all([fetchAllWorkouts(), fetchRecent()]);
      if (selectedWorkoutDetails?.id === workoutId) setSelectedWorkoutDetails(null);
    } catch (err) {
      setError(err);
      throw err;
    }
  }, [fetchAllWorkouts, fetchRecent, selectedWorkoutDetails?.id]);

  const fetchWorkoutDetails = useCallback(async (workoutId) => {
    setIsDetailsLoading(true);
    setError(null);
    try {
      const details = await workoutService.getWorkoutDetails(workoutId);
      setSelectedWorkoutDetails(details);
    } catch (err) {
      setError(err);
      setSelectedWorkoutDetails(null);
    } finally {
      setIsDetailsLoading(false);
    }
  }, []);
  
  const clearWorkoutDetails = useCallback(() => setSelectedWorkoutDetails(null), []);

  return { workouts, recentWorkouts, selectedWorkoutDetails, consecutiveDays, isLoading, isDetailsLoading, error, addWorkout, removeWorkout, fetchWorkoutDetails, clearWorkoutDetails, refreshWorkouts: fetchAllWorkouts };
}