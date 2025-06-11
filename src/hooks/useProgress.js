import { useState, useCallback } from 'react';
import { exerciseServices } from '../services/exercisesServices';

export function useProgress() {
  const [exerciseProgressData, setExerciseProgressData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExerciseProgress = useCallback(async (exerciseId) => {
    if (!exerciseId) {
      setExerciseProgressData([]);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const data = await exerciseServices.getExerciseProgress(exerciseId);
      setExerciseProgressData(data || []);
    } catch (err) {
      setError(err);
      setExerciseProgressData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { exerciseProgressData, isLoading, error, fetchExerciseProgress };
}